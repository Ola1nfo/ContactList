export default function ContactItem({ stor }) {
    console.log(stor);
    return(
        <div>
            {stor.map(contact => (
                <div key={contact.id}>
                    {/* <img src="" alt="" /> */}
                    <div>
                        <h3>{contact.firstName} {contact.lastName}</h3>
                        <p>{contact.phone}</p>
                        <p>{contact.email}</p>
                        <p>{contact.status}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}