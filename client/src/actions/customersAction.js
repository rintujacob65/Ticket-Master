import axios from '../config/axios'
import Swal from 'sweetalert2'

export const setCustomers = ( customers) => {
    return {
        type : 'SET_CUSTOMERS',
        payload : customers
    }
}
export const startSetCustomers = () => {
    return(dispatch) => {
        axios.get('/customers',{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const customers= response.data
            dispatch(setCustomers(customers))
        })
    }
 }
//sync
export const addCustomer = (customer) => {
    return { type :'ADD_CUSTOMER',payload:customer}
}
//async
 export const startAddCustomer = (formData,redirect) => {
    return (dispatch) => {
        axios.post('/customers',formData,{
            headers : {
                'x-auth' :localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                const displayMessages = []
                for(const key in response.data.errors){
                    displayMessages.push(response.data.errors[key].message)
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text:   `${displayMessages.join(', ')}`,
                    confirmButtonText: 'Ok'
                  })
            } else {
            const customer = response.data
            dispatch(addCustomer(customer))
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text:   'You have successfully done it',
                confirmButtonText: 'Ok'
              })
            redirect()
           }
        })
    }
 }
 export const removeCustomer = (id) => {
     return {
         type : 'REMOVE_CUSTOMER', payload : id
     }
 }
export const startRemoveCustomer = (id) => {
    return (dispatch) =>{
        axios.delete(`/customers/${id}`,{
            headers : {
                'x-auth' :localStorage.getItem('authToken')
            }
        })
        .then(response => {
           const customer = response.data
           dispatch(removeCustomer(customer._id))
        }) 
    }
}

//edit

//sync
export const updateCustomer = (customer) => {
    return {
        type : 'UPDATE_CUSTOMER', payload :customer
    }
}
//asyc
export const startUpdateCustomer = (formData, id, redirect) => {
    return (dispatch) => {
        axios.put(`/customers/${id}`, formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const customer = response.data
            dispatch(updateCustomer(customer))
            redirect()
        })
    }
}