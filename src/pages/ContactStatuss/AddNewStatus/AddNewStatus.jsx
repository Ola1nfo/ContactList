import './AddNewStatus.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate} from  'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { addNewStatus } from '../../../redux/action'
import { validationSchema } from '../../../Validation'
import { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function InfoModal({ show, onHide }) {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title><h3>Error</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This status already exists
        </Modal.Body>
        <Modal.Footer>
          <Button className='cancelBtn' variant="secondary" onClick={onHide}>
            Thank you
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function AddNewStatus() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const contactStatuss = useSelector(state => state.contactStatuss)
    const [infoModalShow, setInfoModalShow] = useState(false);

    const initialValues = {
        statusName: '',
        colorStatus: '#cdb4db',
    }

    const handleSubmit = (values, {setSubmitting}) => {
        const statusName = values.statusName.trim();
        if (Object.keys(contactStatuss).includes(statusName)) {
            setInfoModalShow(true)
            setSubmitting(false)
            return
        }

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
                            <button type='submit' className='addBtn' disabled={isSubmitting}>Add</button>
                        </Form>
                    )}
                </Formik>
            </div>
            <InfoModal
                show={infoModalShow}
                onHide={() => setInfoModalShow(false)}
            />
        </div>
    )
}