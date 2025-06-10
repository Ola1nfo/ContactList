import ContactItem from "../../components/ContactItem/ContactItem"
import SideBar from "../../components/SideBar/SideBar"

import { useNavigate} from  'react-router'


export default function ContactList() {
    const navigate = useNavigate()
    const editContact = (id) => {
        navigate(`/edit-contact/${id}`)
    }

    return(
        <div className="contactList container rounded bg-white shadow-lg">
            <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                    <SideBar />
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                    <ContactItem />
                </div>
            </div>
        </div>
    )
}