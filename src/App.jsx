import './App.css'

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router'
import { Provider } from 'react-redux'
import store from './store'

import ContactList from './pages/ContactList/ContactList'
import AddContact from './pages/AddContact/AddContact'
import EditContact from './pages/EditContact/EditContact'
import NotFound from './pages/NotFound/NotFound'
import Header from './components/Header/Header'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<><Header /><ContactList /></>}/>
          <Route path='/add-contact' element={<><Header /><AddContact/></>}/>
          <Route path='/edit-contact/:id' element={<><Header /><EditContact /></>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App