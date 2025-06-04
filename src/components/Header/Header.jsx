import { Link } from "react-router";
import './Header.scss'
 
export default function Header({searchBySymbols}) {
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
                                <input onInput={e => searchBySymbols(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}