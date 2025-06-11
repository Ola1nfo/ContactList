import{
    ADD_CONTACT,
    CONTACT_STATUS,
    DELETE_CONTACT,
    EDIT_CONTACT,
    SEARCH_CONTACT,
    TOGGLE_FAVORITE,
    CONTACT_STATUS_FAVORITE
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

export const toggleFavorite = (id) => {
    return{
        type: TOGGLE_FAVORITE,
        payload: id
    }
}

export const statusFavorite = (favorite) => {
    return{
        type: CONTACT_STATUS_FAVORITE,
        payload: favorite
    }
}