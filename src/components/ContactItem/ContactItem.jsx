export default function ContactItem({ stor, deleteContact, editContact}) {
    console.log(stor);
    return(
        <div>
            {stor.map(contact => (
                <div key={contact.id}>
                    <img src={`https://randomuser.me/api/portraits/${contact.gender}/${contact.avatar}`} alt="" />
                    <div>
                        <h3>{contact.firstName} {contact.lastName}</h3>
                        <p>{contact.phone}</p>
                        <p>{contact.email}</p>
                        <p>{contact.status}</p>
                    </div>
                    <button onClick={() => deleteContact(contact.id)}>Delete</button>
                    <button onClick={() => editContact(contact.id)}>Edit</button>
                </div>
            ))}
        </div>
    )
}