import './App.css'

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router'
import { Provider } from 'react-redux'
import store from './store'

import ContactList from './pages/ContactList/ContactList'
import AddContact from './pages/AddContact/AddContact'
import EditContact from './pages/EditContact/EditContact'
import NotFound from './pages/NotFound/NotFound'
import Header from './components/Header/Header'
import ContactStatuss from './pages/ContactStatuss/ContactStatuss'
import AddNewStatus from './pages/ContactStatuss/AddNewStatus/AddNewStatus'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<><Header /><ContactList /></>}/>
          <Route path='/add-contact' element={<><Header /><AddContact/></>}/>
          <Route path='/contact-statuss' element={<><Header /><ContactStatuss /></>}/>
          <Route path='/contact-statuss/add-new-status' element={<><Header /><AddNewStatus /></>}/>
          <Route path='/edit-contact/:id' element={<><Header /><EditContact /></>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App