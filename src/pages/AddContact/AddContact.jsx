import './AddContact.scss'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate} from  'react-router'
import { IMaskInput } from 'react-imask'

import heardFalse from './img/heafdFalse.png'
import heardTrue from './img/heafdTrue.png'

export default function AddContact() {
    const navigate = useNavigate()

    const initialValues = {
        id: uuidv4(),
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        avatar: '',
        gender: '',
        status: '',
        favorite: ''
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required').min(2, 'Min 2 symbols').max(10, 'Max 10 symbols'),
        lastName: Yup.string().required('Last Name is required').min(2, 'Min 2 symbols').max(15, 'Max 15 symbols'),
        phone: Yup.string().required('Phone is required').min(19, 'More symbols'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        avatar: Yup.string().required('Avatar is required'),
        gender: Yup.string().oneOf(['men', 'women'], 'Invalid gender').required('Gender is required'),
        status: Yup.string().oneOf(['work', 'family', 'friends', 'others']).required('Status is required'),
        favorite: Yup.boolean()
    })

    const handleSubmit = (values) => {
        console.log(values);
        navigate ('/')
    }

    return(
        <div className="container">
            <div className="modal-content addPage">
                <div className="modal-header">
                    <h1 className='title'>Add new contact</h1>
                </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({isSubmitting, values, setFieldValue}) => (
                        <Form>
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
                            <div className='mb-2 col-12'>
                                <label htmlFor="avatar">Avatar</label>
                                <Field type='text' name='avatar' id='avatar'/>
                                <div className="error-wrapper">
                                    <ErrorMessage name='avatar' component='p' className='error'/>
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
                            <button type='submit' className='addBtn' disabled={isSubmitting}>Add</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}