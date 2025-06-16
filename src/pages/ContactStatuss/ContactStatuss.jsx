import './ContactStatuss.scss';
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"

import deleteIcon from './img/delete.png';
import editIcon from './img/edit.png';
import { deleteStatus } from '../../redux/action';


export default function ContactStatuss() {
    const contactStatuss = useSelector(state => state.contactStatuss)
    const contacts = useSelector(state => state.contacts)
    const dispatch = useDispatch()

    const statusCounts = useMemo(() => {
        const counts = {...contactStatuss}
        Object.keys(counts).forEach(status => (counts[status].count = 0))
        contacts.forEach(contact => {
            contactStatuss[contact.status].count++
        })
        return counts
    }, [contacts, contactStatuss])

    const handleDeleteStatus = (status) => {
        dispatch(deleteStatus(status))
    }

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
                                    <div className="btnGroup">
                                        <button className="contactBtn" onClick={() => {handleDeleteStatus(status)}}><img className='deleteImg' src={deleteIcon} alt="Delete" />
                                        </button> 
                                        <Link to={`/edit-status/${status}`}>
                                        <button className="contactBtn"><img className='deleteImg' src={editIcon} alt="Edit" /></button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}