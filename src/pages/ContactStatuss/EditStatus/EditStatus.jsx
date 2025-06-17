import './EditStatus.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, useParams} from  'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { editStatus } from '../../../redux/action'
import { validationSchema } from '../../../Validation'
import { useEffect, useState } from 'react'

export default function EditStatus() {
    const { statusName } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const contactStatuss = useSelector(state => state.contactStatuss)

    const [initialValues, setinitialValues] = useState ({
        statusName: '',
        colorStatus: '#cdb4db',
    })

    useEffect(() => {
        if(contactStatuss && contactStatuss[statusName]){
            setinitialValues({
                statusName: statusName,
                colorStatus:contactStatuss[statusName].bg
            })
        }
    }, [statusName, contactStatuss])

    const handleSubmit = (values, { setSubmitting }) => {
        const updatedStatus = {
            count: contactStatuss[statusName].count, 
            bg: values.colorStatus
        }
        dispatch(editStatus(statusName, values.statusName, updatedStatus))
        setSubmitting(false)
        navigate('/contact-statuss')
    }

    return(
        <div className="containerAddNewStatus">
            <div className="modal-content addPage">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize={true}>
                    {({isSubmitting}) => (
                        <Form>
                            <h1 className='title'>Edit contact status</h1>
                            <div className="row">
                                <div className='col-12'>
                                    <Field 
                                    type='text' 
                                    name='statusName' 
                                    id='statusName' 
                                    placeholder='Enter new status name' 
                                    autoComplete="off"/>
                                    <div className="error-wrapper">
                                        <ErrorMessage name='statusName' component='p' className='error'/>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="colorStatus">Choose color:</label>
                                    <Field name="colorStatus"> 
                                        {({ field, form }) => (
                                            <input 
                                            type='color'
                                            id='colorStatus' 
                                            {...field}  
                                            onChange={e => form.setFieldValue('colorStatus', e.target.value)}
                                            />
                                        )}
                                    </Field>
                                    <div className="error-wrapper">
                                        <ErrorMessage name='colorStatus' component='p' className='error'/>
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='addBtn' disabled={isSubmitting}>Save</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
