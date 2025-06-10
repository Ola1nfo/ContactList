import{
    ADD_CONTACT,
    CONTACT_STATUS,
    DELETE_CONTACT,
    EDIT_CONTACT,
    SEARCH_CONTACT
} from './type'

export const addContact = (newContact) => {
    return{
        type: ADD_CONTACT,
        payload: newContact
    }
}

export const deleteContact = (id) => {
    return{
        type: DELETE_CONTACT,
        payload: id
    }
}

export const editContact = (id, updatedContact) => {
    return{
        type: EDIT_CONTACT,
        payload: {id, updatedContact}
    }
}

export const search = (symbol) => {
    return{
        type: SEARCH_CONTACT,
        payload: symbol
    }
}

export const contactStatus = (status) => {
    return {
        type: CONTACT_STATUS,
        payload: status
    }
}