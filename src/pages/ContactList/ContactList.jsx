import ContactItem from "../../components/ContactItem/ContactItem"
import SideBar from "../../components/SideBar/SideBar"


export default function ContactList({ stor }) {
    return(
        <div className="container rounded">
            <div className="row">
                <div className="col-3">
                    <SideBar/>
                </div>
                <div className="col-9">
                    <ContactItem stor={stor}/>
                </div>
            </div>
        </div>
    )
}