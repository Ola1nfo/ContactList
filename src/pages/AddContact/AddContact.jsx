import './AddContact.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { contactValidationSchema } from '../../Validation'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate} from  'react-router'
import { IMaskInput } from 'react-imask'
import ReactInputDateMask from 'react-input-date-mask'
import { useSelector, useDispatch } from 'react-redux'
import { addContact } from '../../redux/action'

import heardFalse from './img/heafdFalse.png'
import heardTrue from './img/heafdTrue.png'
import viberImg from './img/viber.png'
import telegramImg from './img/telegram.png'

export default function AddContact() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const contactStatuss = useSelector(state => state.contactStatuss)

    const initialValues = {
        id: uuidv4(),
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        phoneViber: '',
        phoneTelegram: '',
        birthday: '',
        gender: '',
        status: '',
        favorite: ''
    }

    const handleSubmit = (values) => {
        dispatch(addContact(values))
        navigate ('/')
    }

    return(
        <div className="containerAddContact">
            <div className="modal-content addPage">
                <Formik initialValues={initialValues} validationSchema={contactValidationSchema} onSubmit={handleSubmit}>
                    {({isSubmitting, values, setFieldValue}) => (
                        <Form>
                            <h1 className='title'>Add new contact</h1>
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
                                    <Field type='text' name='email' id='email' placeholder='Enter your email' autoComplete="off"/>
                                    <div className="error-wrapper">
                                         <ErrorMessage name='email' component='p' className='error'/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='mb-2 col-12 col-md-6'>
                                    <label htmlFor="phoneViber"><img className='phoneImg' src={viberImg} alt="" /></label>
                                    <Field name="phoneViber" >
                                        {({ field, form }) => (
                                            <IMaskInput
                                            {...field}
                                            mask="+{38} (000) 000-00-00"
                                            definitions={{ '0': /[0-9]/ }}
                                            unmask={false}
                                            placeholder="+38 (0__) ___-__-__"
                                            autoComplete="new-password"
                                            onAccept={(value) => form.setFieldValue(field.name, value)}
                                            id="phoneViber"
                                            />
                                        )}
                                    </Field>
                                    <div className="error-wrapper">
                                         <ErrorMessage name='phoneViber' component='p' className='error'/>
                                    </div>
                                </div>
                                <div className='mb-2 col-12 col-md-6'>
                                    <label htmlFor="phoneTelegram"><img className='phoneImg' src={telegramImg} alt="" /></label>
                                    <Field name="phoneTelegram" >
                                        {({ field, form }) => (
                                            <IMaskInput
                                            {...field}
                                            mask="+{38} (000) 000-00-00"
                                            definitions={{ '0': /[0-9]/ }}
                                            unmask={false}
                                            placeholder="+38 (0__) ___-__-__"
                                            autoComplete="new-password"
                                            onAccept={(value) => form.setFieldValue(field.name, value)}
                                            id="phoneTelegram"
                                            />
                                        )}
                                    </Field>
                                    <div className="error-wrapper">
                                         <ErrorMessage name='phoneTelegram' component='p' className='error'/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-12'>
                                    <Field name="birthday">
                                        {({ field, form }) => (
                                            <ReactInputDateMask  
                                            {...field}
                                            mask="dd.mm.yyyy"
                                            id="birthday"
                                            className="birthday"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            />
                                        )}
                                    </Field>
                                    <div className="error-wrapper">
                                        <ErrorMessage name='birthday' component='p' className='error'/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='mb-2 col-12 col-md-6'>
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
                                    <Field as='select' name='status' id='status'>
                                        <option value="">Choose status</option>
                                        {Object.keys(contactStatuss)
                                        .filter(statusKey => statusKey !== 'favorites')
                                        .map((statusKey) => (
                                            <option style={{background: contactStatuss[statusKey].bg}} key={statusKey} value={statusKey}>
                                                {statusKey}
                                            </option>
                                        ))}
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
                            <button type='submit' className='addBtn' disabled={isSubmitting}>Add</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}