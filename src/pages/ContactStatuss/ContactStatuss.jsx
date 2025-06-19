import './ContactStatuss.scss';
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"

import deleteIcon from './img/delete.png';
import editIcon from './img/edit.png';
import { deleteStatus } from '../../redux/action';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteModal({ show, onHide, onConfirm }) {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this status?</Modal.Body>
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

export default function ContactStatuss() {
    const contactStatuss = useSelector(state => state.contactStatuss)
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [statusToShow, setStatusToShow] = useState(null);

    const statusCounts = useMemo(() => {
        const counts = {...contactStatuss}
        Object.keys(counts).forEach(status => (counts[status].count = 0))
        contacts.forEach(contact => {
            contactStatuss[contact.status].count++
        })
        return counts
    }, [contacts, contactStatuss])

    const handleDeleteStatus = (status) => {
        setStatusToShow(status);
        setDeleteModalShow(true);
    }

    const handleConfirmDelete = () => {
        if (statusToShow) {
            dispatch(deleteStatus(statusToShow));
            setDeleteModalShow(false);
            setStatusToShow(null);
        }
    };

    return(
        <main className="container contactStatuss rounded bg-white shadow-lg">
            <div className="row">
                <div className="col-12">
                    <Link to={'/contact-statuss/add-new-status'} className='addBtn'>Add + </Link>
                    <table className="tableStatus">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Status name</th>
                            <th>Color</th>
                            <th>Contact count</th>
                            <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.keys(statusCounts).map((status, index) => (
                            <tr key={index} style={{backgroundColor: statusCounts[status].bg}}>
                                <td scope="row">{++index}</td>
                                <td className="statusName">{status}</td>
                                <td>{statusCounts[status].bg}</td>
                                <td>{statusCounts[status].count}</td>
                                <td>
                                    {status !== 'others' && (
                                      <div className="btnGroup">
                                        <button className="contactBtn" onClick={() => {handleDeleteStatus(status)}}><img className='deleteImg' src={deleteIcon} alt="Delete" />
                                        </button> 
                                        <Link to={`/contact-statuss/edit-status/${status}`}>
                                        <button className="contactBtn"><img className='deleteImg' src={editIcon} alt="Edit" /></button>
                                        </Link>
                                    </div>  
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <DeleteModal
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                onConfirm={handleConfirmDelete}
            />
        </main>
        
    )
}