import { useState } from 'react';
import './ContactItem.scss';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, toggleFavorite } from '../../redux/action'

import womenImg from './img/woman.png';
import menImg from './img/man.png';
import deleteIcon from './img/delete.png';
import editIcon from './img/edit.png';
import heardFalse from '../../pages/AddContact/img/heafdFalse.png'
import heardTrue from '../../pages/AddContact/img/heafdTrue.png'
import phoneImg from './img/phone-call.png'
import shareImg from './img/share.png'
import telegramImg from './img/telegram.png'
import viberImg from './img/viber.png'
import gmailImg from './img/gmail.png'

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

function InfoModal({ show, onHide, contact }) {
  const formatPhone = (number) => number ? number.replace(/\D/g, '') : ''

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
              className={`contactImg  ${contact.gender}`}
              src={contact.gender === 'women' ? womenImg : menImg}
              alt=""
            />
            <a href={`tel:${contact.phone}`}><img className='phoneImg' src={phoneImg} alt="" /></a>
            {contact.phoneViber && (
              <a href={`viber://chat?number=%2B${formatPhone(contact.phoneViber)}`}>
                <img className='phoneImg' src={viberImg} alt="Viber" />
              </a>
            )}
            {contact.phoneTelegram && (
              <a href={`tg://resolve?phone=${formatPhone(contact.phoneTelegram)}`}>
                <img className='phoneImg' src={telegramImg} alt="Telegram" />
              </a>
            )}
            <p>{contact.email}</p>
            {contact.birthday && (
              <p>{contact.birthday}</p>
            )}
            <p>{contact.gender}</p>
            <p>{contact.status}</p>
            <p>{contact.favorite === true ? (<img className='imgFavorite' src={heardTrue} alt="Favorite" />) : (<img className='imgFavorite' src={heardFalse} alt="Not favorite"/>)}</p>
          </>
        )}
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

function ShareContactModal(props) {
  const { contact } = props;

  if (!contact) return null

  const shareText = `Контакт:${contact.firstName} ${contact.lastName} ${contact.phone} ${contact.email}`;
  const encodedText = encodeURI(shareText);

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"> Share contact </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <a href={`https://t.me/share/url?url=${encodedText}`}><img className='shareImgModal' src={telegramImg} alt="" /></a>
          <a href={`viber://forward?text=${encodedText}`}><img className='shareImgModal' src={viberImg} alt="" /></a>
          <a href={`mailto:?subject=Контакт ${contact.name}&body=${encodedText}`}><img className='shareImgModal' src={gmailImg} alt="" /></a>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className='cancelBtn' variant="secondary"> Close </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default function ContactItem() {
  const contacts = useSelector(state => state.contacts)
  const search = useSelector(state => state.search)
  const dispatch = useDispatch()
  const filterStatus = useSelector(state => state.contactStatus)  

  const [infoModalShow, setInfoModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [contactToShow, setContactToShow] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [contactToShare, setContactToShare] = useState(null);

  const shareText = `Контакт: ${contacts.name} ${contacts.phone} ${contacts.email}`
  const codedText = encodeURI(shareText)

  const filteredContacts = contacts.filter(contact => {
      const matchesSearch = search ? (`${contact.firstName} ${contact.lastName} ${contact.phone} ${contact.email} ${contact.gender} ${contact.status}`).toLowerCase().includes(search.toLowerCase()) : true
      let matchesStatus = true
      if (filterStatus === 'favorites') {
          matchesStatus = contact.favorite === true
      } else if (filterStatus && filterStatus !== 'all') {
          matchesStatus = contact.status === filterStatus
      }
      return matchesSearch && matchesStatus
  })
  
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
      dispatch(deleteContact(contactToShow.id));
      setContactToShow(null);
      setDeleteModalShow(false);
    }
  };

  const handleShareClick = (contact) => {
    setContactToShare(contact);
    setShowModal(true);
  }

  return (
    <div className='containerBlock'>
      {filteredContacts.map(contact => (
        <div className='contactBlock' key={contact.id}>
          <img onClick={() => handleInfoClick(contact)} className={`contactImg  ${contact.gender}`} src={contact.gender === 'women' ? womenImg : menImg} alt="" title="Детальніше" />
          <button className='favoriteBtn' onClick={() => dispatch(toggleFavorite(contact.id))}>
            {contact.favorite ? '♥' : '♡'}
          </button>
          <div className="contactContent">
            <h3>{contact.firstName} {contact.lastName}</h3>
            <p>{contact.email}</p>
            <p>{contact.birthday}</p>
            <p>{contact.status}</p>
            <div className='btnGroup'>
              <a href={`tel:${contact.phone}`}><img className='phoneImg' src={phoneImg} alt="" /></a>
              <p onClick={() => handleShareClick(contact)}><img className='shareImg' src={shareImg} alt="" /></p>
            </div>
            <div className="btnGroup">
              <button className="contactBtn" onClick={() => handleDeleteClick(contact)}><img className='deleteImg' src={deleteIcon} alt="Delete" />
              </button> 
              <Link to={`/edit-contact/${contact.id}`}>
                <button className="contactBtn"><img className='deleteImg' src={editIcon} alt="Edit" /></button>
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

      <ShareContactModal
        show={showModal}
        onHide={() => setShowModal(false)}
        contact={contactToShare}
      />
    </div>
  );
}
