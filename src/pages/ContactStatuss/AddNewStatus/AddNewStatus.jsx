import './AddNewStatus.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate} from  'react-router'
import { useDispatch } from 'react-redux'
import { addNewStatus } from '../../../redux/action'

const validationSchema = Yup.object({
    statusName: Yup.string().required('Status name is required').min(2, 'Min 2 symbols'),
    colorStatus: Yup.string().matches(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, 'Must be a valid hex color').required('Color is required')
})

export default function AddNewStatus() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValues = {
        statusName: '',
        colorStatus: ''
    }

    const handleSubmit = (values, {setSubmitting}) => {
        const newStatus = {
            [values.statusName] : { count: 0, bg: values.colorStatus }
        }
        dispatch(addNewStatus(newStatus))
        setSubmitting(false)
        navigate('/contact-statuss')
    }

    return(
        <div className="containerAddNewStatus">
            <div className="modal-content addPage">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({isSubmitting}) => (
                        <Form>
                            <h1 className='title'>Add new contact status</h1>
                            <div className="row">
                                <div className='mb-2 col-12 col-md-6'>
                                    <Field type='text' name='statusName' id='statusName' placeholder='Enter new status name' autoComplete="off"/>
                                    <div className="error-wrapper">
                                        <ErrorMessage name='statusName' component='p' className='error'/>
                                    </div>
                                </div>
                                <div className='mb-2 col-12 col-md-6'>
                                    <Field type='text' name='colorStatus' id='colorStatus' placeholder='Enter color' autoComplete="off"/>
                                    <div className="error-wrapper">
                                        <ErrorMessage name='colorStatus' component='p' className='error'/>
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='addBtn' disabled={isSubmitting}>Add</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}