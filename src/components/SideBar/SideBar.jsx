import './SideBar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { setFilter } from '../../redux/action'

export default function SideBar() {
    const contacts = useSelector(state => state.contacts)
    const search = useSelector(state => state.search) 
    const contactStatuss = useSelector(state => state.contactStatuss)
    const dispatch = useDispatch()
    const filterStatus = useSelector(state => state.contactStatus)
    
    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = search ? (`${contact.firstName} ${contact.lastName} ${contact.phone} ${contact.email} ${contact.gender} ${contact.status}`).toLowerCase().includes(search.toLowerCase()) : true;
        const matchesStatus = filterStatus && filterStatus !== 'all' ? contact.status === filterStatus : true;
        return matchesSearch && matchesStatus;
    });
   
    const totalContacts = filteredContacts.length

    const statusCounts = useMemo(() => {
        const counts = {...contactStatuss}
        Object.keys(counts).forEach(status => (counts[status].count = 0))
        filteredContacts.forEach(contact => {
            contactStatuss[contact.status].count++
        })
        return counts
    }, [filteredContacts, contactStatuss, search])

    const statusClick = (status) => {
        dispatch(setFilter(status))
    }
    
    return(
        <aside className="container position-sticky">
            <div className="row">
                <div className="col-12">
                    <div className="contacts-labels">
                        <div className="fs-4 mb-5 mt-4 allContact" onClick={() => statusClick('all')}>
                            All contacts: <span className="fs-5">{totalContacts}</span>
                        </div>
                        <div className="list fs-5">
                            {
                                Object.keys(statusCounts).map(status => (
                                    <div key={status} className="listItem d-flex justify-content-between mb-3" style={{backgroundColor: statusCounts[status].bg}} onClick={() => statusClick(status)}>
                                        <div className='statusWord'>
                                            {status}
                                        </div>
                                        <span className="fs-5">{statusCounts[status].count}</span>
                                    </div>
                                ))
                            }
                            {/* <div className="listItem d-flex justify-content-between mb-3" onClick={() => statusClick('family')}>
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}