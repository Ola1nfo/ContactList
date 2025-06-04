import './EditContact.scss'
import { useParams, useNavigate } from "react-router"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { contactValidationSchema } from '../../Validation'
import { IMaskInput } from 'react-imask'

import heardFalse from '../AddContact/img/heafdFalse.png'
import heardTrue from '../AddContact/img/heafdTrue.png'

export default function EditContact({stor, updateContact}) {
    const { id } = useParams()
    const navigate = useNavigate()
    const contact = stor.contacts.find(con => con.id === id)

    const initialValues = {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        email: contact.email,
        gender: contact.gender,
        status: contact.status,
        favorite: contact.favorite
    }

    const handleSubmit = (values) => {
        console.log(values);
        updateContact(values);
        navigate ('/')
    }

    return(
        <div className="containerAddContact">
            <div className="modal-content addPage">
                <Formik initialValues={initialValues} validationSchema={contactValidationSchema} onSubmit={handleSubmit}>
                    {({isSubmitting, values, setFieldValue}) => (
                        <Form>
                            <h1 className='title'>Edit contact</h1>
                            <div className="row">
                                <div className='mb-2 col-12 col-md-6'>
                                    <Field type='text' name='firstName' id='firstName' placeholder='Enter your first name' autoComplete="new-password"/>
                                    <div className="error-wrapper">
                                        <ErrorMessage name='firstName' component='p' className='error'/>
                                    </div>
                                </div>
                                <div className='mb-2 col-12 col-md-6'>
                                    <Field type='text' name='lastName' id='lastName' placeholder='Enter your last name' autoComplete="new-password"/>
                                    <div className="error-wrapper">
                                        <ErrorMessage name='lastName' component='p' className='error'/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='mb-2 col-12 col-md-6'>
                                    <label htmlFor="phone">Phone</label>
                                    <Field name="phone" >
                                        {({ field, form }) => (
                                            <IMaskInput
                                            {...field}
                                            mask="+{38} (000) 000-00-00"
                                            definitions={{ '0': /[0-9]/ }}
                                            unmask={false}
                                            placeholder="+38 (0__) ___-__-__"
                                            autoComplete="new-password"
                                            onAccept={(value) => form.setFieldValue(field.name, value)}
                                            id="phone"
                                            />
                                        )}
                                    </Field>
                                    <div className="error-wrapper">
                                         <ErrorMessage name='phone' component='p' className='error'/>
                                    </div>
                                </div>
                                <div className='mb-2 col-12 col-md-6'>
                                    <label htmlFor="email">Email</label>
                                    <Field type='text' name='email' id='email' autoComplete="off"/>
                                    <div className="error-wrapper">
                                         <ErrorMessage name='email' component='p' className='error'/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='mb-2 col-12 col-md-6'>
                                    <label htmlFor="gender">Gender</label>
                                    <Field as='select' type='text' name='gender' id='gender'>
                                        <option value="">Choose gender</option>
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                    </Field>
                                    <div className="error-wrapper">
                                        <ErrorMessage name='gender' component='p' className='error'/>
                                    </div>
                                </div>
                                <div className='mb-2 col-12 col-md-6'>
                                    <label htmlFor="status">Status</label>
                                    <Field as='select' name='status' id='status'>
                                        <option value="">Choose status</option>
                                        <option value="work">Work</option>
                                        <option value="family">Family</option>
                                        <option value="friends">Friends</option>
                                        <option value="friends">Privat</option>
                                        <option value="others">Others</option>
                                    </Field>
                                    <div className="error-wrapper">
                                        <ErrorMessage name='status' component='p' className='error'/>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-2'>
                                <label className='favorite' htmlFor="favorite" onClick={() => setFieldValue('favorite', !values.favorite)}>Favorite
                                    {values.favorite ? (<img className='imgFavorite' src={heardTrue} alt="Favorite" />) : (<img className='imgFavorite' src={heardFalse} alt="Not favorite" />)}
                                </label>
                                <Field type='checkbox' name='favorite' className='checkbox' checked={values.favorite} onChange={() => setFieldValue('favorite', !values.favorite)} />
                            </div>
                            <button type='submit' className='addBtn' disabled={isSubmitting}>Save</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
