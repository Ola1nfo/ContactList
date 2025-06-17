import{
    ADD_CONTACT,
    DELETE_CONTACT,
    EDIT_CONTACT,
    TOGGLE_FAVORITE,
    SEARCH_CONTACT,
    SET_FILTER,
    ADD_NEW_STATUS,
    DELETE_STATUS,
    EDIT_STATUS

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
        payload: symbol.toLowerCase()
    }
}

export const setFilter = (status) => {
    return {
        type: SET_FILTER,
        payload: status
    }
}

export const toggleFavorite = (id) => {
    return{
        type: TOGGLE_FAVORITE,
        payload: id
    }
}

export const addNewStatus = (newStatus) => {
    return{
        type: ADD_NEW_STATUS,
        payload: newStatus
    }
}

export const deleteStatus = (status) => {
    return{
        type: DELETE_STATUS,
        payload: status
    }
}

export const editStatus = (oldStatusName, editStatusName, updatedStatus) => {
    return{
        type: EDIT_STATUS,
        payload: {oldStatusName, editStatusName, updatedStatus}
    }
}