import './AddContact.scss'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate} from  'react-router'

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
        atatus: '',
        favorite: ''
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required').min(2, 'Min 2 symbols').max(10, 'Max 10 symbols'),
        lastName: Yup.string().required('Last Name is required').min(2, 'Min 2 symbols').max(10, 'Max 10 symbols'),
        phone: Yup.string().required('Phone is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        avatar: Yup.string().required('Avatar is required'),
        gender: Yup.string().oneOf(['men', 'women'], 'Invalid gender').required('Gender is required'),
        status: Yup.string().oneOf(['work', 'family', 'friends', 'others']).required('Status is required'),
        favorite: Yup.boolean()
    })

    const handleSubmin = (values) => {
        console.log(values);
        navigate ('/')
    }

    return(
        <div className="container">
            <div className="modal-content addPage rounded shadow">
                <div className="modal-header">
                    <h1 className='text-center'>Add new contact</h1>
                </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmin}>
                    {({isSubmitting}) => (
                        <Form>
                            <div className='mb-5'>
                                <label htmlFor="firstName">First name</label>
                                <Field type='text' name='firstName' id='firstName'/>
                                <ErrorMessage name='firstName' component='p' className='text-danger position-absolute'/>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="lastName">Last name</label>
                                <Field type='text' name='lastName' id='lastName'/>
                                <ErrorMessage name='lastName' component='p' className='text-danger'/>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="phone">Phone</label>
                                <Field type='text' name='phone' id='phone'/>
                                <ErrorMessage name='phone' component='p' className='text-danger'/>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="email">Email</label>
                                <Field type='text' name='email' id='email'/>
                                <ErrorMessage name='email' component='p' className='text-danger'/>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="avatar">Avatar</label>
                                <Field type='text' name='avatar' id='avatar'/>
                                <ErrorMessage name='avatar' component='p' className='text-danger'/>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="gender">Gender</label>
                                <Field as='select' type='text' name='gender'>
                                    <option value="">Choose gender</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </Field>
                                <ErrorMessage name='gender' component='p' className='text-danger'/>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="status">Status</label>
                                <Field as='select' name='status'>
                                    <option value="">Choose gender</option>
                                    <option value="work">Work</option>
                                    <option value="family">Family</option>
                                    <option value="friends">Friends</option>
                                    <option value="others">Others</option>
                                </Field>
                                <ErrorMessage name='status' component='p' className='text-danger'/>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="favorite">Favorite</label>
                                <Field type='checkbox' name='favorite'/>
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg' disabled={isSubmitting}>Add</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}