import { useLocation, Link } from "react-router";
import './Header.scss'
import { useSelector, useDispatch } from 'react-redux'
import { search } from '../../redux/action'
 
export default function Header() {
    const searchContact = useSelector(state => state.search)
    const dispatch = useDispatch()
    const location = useLocation()

    return(
        <header className="container containerHeader">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar bg-body-tertiary rounded shadow">
                        <div className="container-fluid">
                           <div className="navbar-brand">
                            <Link className={`navbar-brand navbar-menu ${location.pathname === '/' ? 'active' : ''}`} to="/">
                                Contact List
                            </Link>
                            <Link className={`navbar-brand navbar-menu ${location.pathname === '/add-contact' ? 'active' : ''}`} to="/add-contact">
                               Add Contact
                            </Link>
                            <Link className={`navbar-brand navbar-menu ${location.pathname === '/contact-statuss' ? 'active' : ''}`} to="/contact-statuss">
                               Statuss
                            </Link>
                           </div>
                            <form className="d-flex" role="search">
                                <input value={searchContact} onInput={e => dispatch(search(e.target.value))} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}