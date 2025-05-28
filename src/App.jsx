import './App.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router'
import { useState } from 'react'

import ContactList from './pages/ContactList/ContactList'
import AddContact from './pages/AddContact/AddContact'
import EditContact from './pages/EditContact/EditContact'
import NotFound from './pages/NotFound/NotFound'
import Header from './components/Header/Header'

function App() {
  const [stor, setStor] = useState(
    [
      {
        id: 'fcf0414f-add4-4891-8651-70139511d246',
        firstName: 'Ola',
        lastName: 'Romanovska',
        phone: '+38 (096) 901-88-12',
        email: 'Romanovska@gmail.com',
        avatar: 5,
        gender: 'women',
        status: 'work',
        favorite: 'true'
      },
      {
        id: 'fcf0414f-add4-4891-8651-70139611d246',
        firstName: 'Ola',
        lastName: 'Romanovska',
        phone: '+38 (096) 901-88-12',
        email: 'Romanovska@gmail.com',
        avatar: 5,
        gender: 'women',
        status: 'work',
        favorite: 'true'
      },
      {
        id: 'fcf0414f-add4-5891-8651-70139511d246',
        firstName: 'Ola',
        lastName: 'Romanovska',
        phone: '+38 (096) 901-88-12',
        email: 'Romanovska@gmail.com',
        avatar: 5,
        gender: 'women',
        status: 'work',
        favorite: 'true'
      }
    ]
  )

  const handleNewContact = (newContact) => {
    setStor(prevStor => [...prevStor, newContact])
  }

  const deleteContact = (id) => {
    setStor(prevStor => prevStor.filter(contact => contact.id !== id))
  }



  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<ContactList stor={stor} deleteContact={deleteContact}/>}/>
        <Route path='/add-contact' element={<AddContact addNewContact={handleNewContact}/>}/>
        <Route path='/edit-contact' element={<EditContact/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App