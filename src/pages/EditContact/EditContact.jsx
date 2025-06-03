import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react-router"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { contactValidationSchema } from '../../Validation'
import { IMaskInput } from 'react-imask'

import heardFalse from './img/heafdFalse.png'
import heardTrue from './img/heafdTrue.png'

export default function EditContact() {
     const { id } = useParams()
     const navigate = useNavigate()

     const contact = stor.find(con => con.id === id)


    return(
        <>
           

        </>
    )
}