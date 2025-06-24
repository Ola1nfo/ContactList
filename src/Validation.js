import * as Yup from 'yup'

export const contactValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').min(2, 'Min 2 symbols').max(10, 'Max 10 symbols'),
    lastName: Yup.string().required('Last Name is required').min(2, 'Min 2 symbols').max(15, 'Max 15 symbols'),
    birthday: Yup.string().matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Формат має бути дд.мм.рррр'),
    phone: Yup.string().required('Phone is required').min(19, 'More symbols'),
    phoneViber: Yup.string().min(19, 'More symbols'),
    phoneTelegram: Yup.string().min(19, 'More symbols'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().oneOf(['men', 'women'], 'Invalid gender').required('Gender is required'),
    status: Yup.string().required('Status is required'),
    favorite: Yup.boolean()
})

export const validationSchema = Yup.object({
    statusName: Yup.string().required('Status name is required').min(2, 'Min 2 symbols'),
    colorStatus: Yup.string().matches(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, 'Must be a valid hex color').required('Color is required')
})