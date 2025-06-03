import './SideBar.scss'

export default function SideBar({ stor }) {

    const totalContacts = stor.length
    const statusCounts = {
        work: 0,
        family: 0,
        private: 0,
        friends: 0,
        others: 0
    }

    stor.forEach(contact => {
        statusCounts[contact.status] +=1
    });

    console.log(statusCounts);
    


    return(
        <aside className="container">
            <div className="row">
                <div className="col-12">
                    <div className="contacts-labels">
                        <div className="fs-4 mb-5 mt-4 allContact">
                            All contacts: <span className="fs-5">{totalContacts}</span>
                        </div>
                        <div className="list fs-5">
                            <div className="listItem d-flex justify-content-between mb-3">
                                <div>
                                    Work
                                </div>
                                <span className="fs-5">{statusCounts.work}</span>
                            </div>
                            <div className="listItem d-flex justify-content-between mb-3">
                                <div>
                                    Family
                                </div>
                                <span className="fs-5">{statusCounts.family}</span>
                            </div>
                            <div className="listItem d-flex justify-content-between mb-3">
                                <div>
                                    Friends
                                </div>
                                <span className="fs-5">{statusCounts.friends}</span>
                            </div>
                            <div className="listItem d-flex justify-content-between mb-3">
                                <div>
                                    Private
                                </div>
                                <span className="fs-5">{statusCounts.private}</span>
                            </div>
                            <div className="listItem d-flex justify-content-between mb-3">
                                <div>
                                    Others
                                </div>
                                <span className="fs-5">{statusCounts.others}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}