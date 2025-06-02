import * as Yup from 'yup'

export const contactValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').min(2, 'Min 2 symbols').max(10, 'Max 10 symbols'),
    lastName: Yup.string().required('Last Name is required').min(2, 'Min 2 symbols').max(15, 'Max 15 symbols'),
    phone: Yup.string().required('Phone is required').min(19, 'More symbols'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().oneOf(['men', 'women'], 'Invalid gender').required('Gender is required'),
    status: Yup.string().oneOf(['work', 'family', 'friends', 'privat', 'others']).required('Status is required'),
    favorite: Yup.boolean()
})