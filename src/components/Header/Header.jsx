import { Link } from "react-router";
 
export default function Header() {
    return(
        <header className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar bg-body-tertiary rounded shadow">
                        <div className="container-fluid">
                           <div className="navbar-brand">
                            <Link className="navbar-brand" to="/">
                                Contact List
                            </Link>
                            <Link className="navbar-brand" to="/add-contact">
                               Add Contact
                            </Link>
                           </div>
 
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}