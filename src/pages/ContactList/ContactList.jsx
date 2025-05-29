import ContactItem from "../../components/ContactItem/ContactItem"
import SideBar from "../../components/SideBar/SideBar"

import { useNavigate} from  'react-router'


export default function ContactList({ stor, deleteContact }) {
    const navigate = useNavigate()
    const editContact = (id) => {
        navigate(`/edit-contact/${id}`)
    }

    return(
        <div className="container rounded">
            <div className="row">
                <div className="col-3">
                    <SideBar/>
                </div>
                <div className="col-9">
                    <ContactItem stor={stor} deleteContact={deleteContact} editContact={editContact}/>
                </div>
            </div>
        </div>
    )
}