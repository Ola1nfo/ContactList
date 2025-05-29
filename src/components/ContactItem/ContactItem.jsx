import './ContactItem.scss'

import womenImg from './img/woman.png'
import menImg from './img/man.png'

export default function ContactItem({ stor, deleteContact, editContact}) {
    console.log(stor);
    return(
        <div className='containerBlock'>
            {stor.map(contact => (
                <div className='contackBlock' key={contact.id}>
                    <img className='contactImg' src={contact.gender === 'women' ? womenImg : menImg} alt="" />
                    <div className="contactContent">
                        <h3>{contact.firstName} {contact.lastName}</h3>
                        <p>{contact.phone}</p>
                        <p>{contact.email}</p>
                        <p>{contact.status}</p>
                        <div className="btnGroup">
                            <button className="contactBtn" onClick={() => deleteContact(contact.id)}>Delete</button>
                            <button className="contactBtn" onClick={() => editContact(contact.id)}>Edit</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}