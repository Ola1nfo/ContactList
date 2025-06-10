import { useState } from 'react';
import './ContactItem.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/action'
import { editContact } from '../../redux/action';

import womenImg from './img/woman.png';
import menImg from './img/man.png';
import deleteIcon from './img/delete.png';
import editIcon from './img/edit.png';
import heardFalse from '../../pages/AddContact/img/heafdFalse.png'
import heardTrue from '../../pages/AddContact/img/heafdTrue.png'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router';

function DeleteModal({ show, onHide, onConfirm }) {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
        <Modal.Footer>
          <Button className='cancelBtn' variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button className='deleteBtn' variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function InfoModal({ show, onHide, onConfirm, contact }) {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title><h3>{contact ? `${contact.firstName} ${contact.lastName}` : 'Contact'}</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contact && (
          <>
            <img
              className='contactImg'
              src={contact.gender === 'women' ? womenImg : menImg}
              alt=""
            />
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            <p>{contact.gender}</p>
            <p>{contact.status}</p>
            <p>{contact.favorite === true ? (<img className='imgFavorite' src={heardTrue} alt="Favorite" />) : (<img className='imgFavorite' src={heardFalse} alt="Not favorite"/>)}</p>
          </>
        )}
        {!contact && <p>No contact selected.</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button className='cancelBtn' variant="secondary" onClick={onHide}>
            Thank you
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function ContactItem() {
  const contacts = useSelector(state => state.contacts)
  const search = useSelector(state => state.search)
  const dispatch = useDispatch()

  const [infoModalShow, setInfoModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [contactToShow, setContactToShow] = useState(null);

  const filteredContacts = search ? contacts.filter(contact => `${contact.firstName} ${contact.lastName} ${contact.phone} ${contact.email} ${contact.gender} ${contact.status}`.includes(search)) : contacts
  
  const handleDeleteClick = (contact) => {
    setContactToShow(contact);
    setDeleteModalShow(true);
  };

  const handleInfoClick = (contact) => {
    setContactToShow(contact);
    setInfoModalShow(true);
  };

   const handleConfirmDelete = () => {
    if (contactToShow) {
      deleteContact(contactToShow.id);
      setContactToShow(null);
      setDeleteModalShow(false);
    }
  };

  return (
    <div className='containerBlock'>
      {filteredContacts.map(contact => (
        <div className='contactBlock' key={contact.id}>
          <img onClick={() => handleInfoClick(contact)} className='contactImg' src={contact.gender === 'women' ? womenImg : menImg} alt="" title="Детальніше" />
          <div className="contactContent">
            <h3>{contact.firstName} {contact.lastName}</h3>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            <p>{contact.status}</p>
            <div className="btnGroup">
              <button className="contactBtn" onClick={() => dispatch(deleteContact(contact.id))}><img className='deleteImg' src={deleteIcon} alt="Delete" />
              </button> 
              <Link to={`/edit-contact/${contact.id}`}>
                <button className="contactBtn" onClick={() => dispatch(editContact(contact.id))}><img className='deleteImg' src={editIcon} alt="Edit" /></button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <DeleteModal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        onConfirm={handleConfirmDelete}
      />

      <InfoModal
        show={infoModalShow}
        onHide={() => setInfoModalShow(false)}
        contact={contactToShow}
      />
    </div>
  );
}
