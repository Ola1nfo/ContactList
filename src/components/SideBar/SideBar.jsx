import './SideBar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { contactStatus, statusFavorite } from '../../redux/action'

export default function SideBar() {
    const contacts = useSelector(state => state.contacts)
    const search = useSelector(state => state.search)
    const dispatch = useDispatch()
    const filterStatus = useSelector(state => state.contactStatus)
    const filterFavorite = useSelector(state => state.filterFavorite)

    const statusClick = (status) => {     
        dispatch(contactStatus(status))
    }

    const statusFavoriteClick = () => {
        dispatch(statusFavorite(!filterFavorite))
    }

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = search ? (`${contact.firstName} ${contact.lastName} ${contact.phone} ${contact.email} ${contact.gender} ${contact.status}`).includes(search) : true;
        const matchesStatus = filterStatus && filterStatus !== 'all' ? contact.status === filterStatus : true;
        const matchesFavorite = filterFavorite ? contact.favorite : true
        return matchesSearch && matchesStatus && matchesFavorite;
    });

    const totalContacts = filteredContacts.length
    const statusCounts = {
        work: 0,
        family: 0,
        private: 0,
        friends: 0,
        others: 0
    }

    const favoriteCount = filteredContacts.filter(contact => contact.favorite).length;

    filteredContacts.forEach(contact => {
        statusCounts[contact.status] +=1
    });
    
    return(
        <aside className="container">
            <div className="row">
                <div className="col-12">
                    <div className="contacts-labels">
                        <div className="fs-4 mb-5 mt-4 allContact" onClick={() => statusClick('all')}>
                            All contacts: <span className="fs-5">{totalContacts}</span>
                        </div>
                        <div className="list fs-5">
                            <div className="listItem d-flex justify-content-between mb-3" onClick={() => statusClick('work')}>
                                <div>
                                    Work
                                </div>
                                <span className="fs-5">{statusCounts.work}</span>
                            </div>
                            <div className="listItem d-flex justify-content-between mb-3" onClick={() => statusClick('family')}>
                                <div>
                                    Family
                                </div>
                                <span className="fs-5">{statusCounts.family}</span>
                            </div>
                            <div className="listItem d-flex justify-content-between mb-3" onClick={() => statusClick('friends')}>
                                <div>
                                    Friends
                                </div>
                                <span className="fs-5">{statusCounts.friends}</span>
                            </div>
                            <div className="listItem d-flex justify-content-between mb-3" onClick={() => statusClick('private')}>
                                <div>
                                    Private
                                </div>
                                <span className="fs-5">{statusCounts.private}</span>
                            </div>
                            <div className="listItem d-flex justify-content-between mb-3" onClick={() => statusClick('others')}>
                                <div>
                                    Others
                                </div>
                                <span className="fs-5">{statusCounts.others}</span>
                            </div>
                            <div className="listItem d-flex justify-content-between mb-3" onClick={statusFavoriteClick}>
                                <div>
                                    Favorite
                                </div>
                                <span className="fs-5">{favoriteCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}