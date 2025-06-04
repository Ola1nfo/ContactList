import React, { useState } from 'react';
import './ContactItem.scss';

import womenImg from './img/woman.png';
import menImg from './img/man.png';
import deleteIcon from './img/delete.gif';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmDeleteModal({ show, onHide, onConfirm }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="confirm-delete-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="confirm-delete-modal">
          Підтвердження видалення
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Ви впевнені, що хочете видалити цей контакт?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Відмінити
        </Button>
        <Button variant="danger" onClick={() => {
          onConfirm();
          onHide();
        }}>
          Видалити
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function ContactItem({ stor, deleteContact, editContact }) {
  const [modalShow, setModalShow] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const filteredContacts = stor.search
    ? stor.contacts.filter(contact =>
        `${contact.firstName} ${contact.lastName} ${contact.phone} ${contact.email} ${contact.status}`
          .toLowerCase()
          .includes(stor.search.toLowerCase())
      )
    : stor.contacts;

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setModalShow(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      deleteContact(contactToDelete.id);
      setContactToDelete(null);
    }
  };

  return (
    <div className='containerBlock'>
      {filteredContacts.map(contact => (
        <div className='contackBlock' key={contact.id}>
          <img className='contactImg' src={contact.gender === 'women' ? womenImg : menImg} alt="" />
          <div className="contactContent">
            <h3>{contact.firstName} {contact.lastName}</h3>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            <p>{contact.status}</p>
            <div className="btnGroup">
              <button
                className="contactBtn"
                onClick={() => handleDeleteClick(contact)}
              >
                <img className='deleteImg' src={deleteIcon} alt="Delete" />
              </button>
              <button className="contactBtn" onClick={() => editContact(contact.id)}>Edit</button>
            </div>
          </div>
        </div>
      ))}

      <ConfirmDeleteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
