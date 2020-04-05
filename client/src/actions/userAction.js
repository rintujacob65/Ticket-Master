import axios from '../config/axios'
import Swal from 'sweetalert2'

export const startRegister = (formData,redirect) => {
    console.log("formData",formData)
   return(dispatch) => {
            axios.post('/users/register',formData)
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
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text:   'You have successfully registered',
                        confirmButtonText: 'Ok'
                      })
                    redirect()
                }
            })
        }
}
export const setUser = (user) => {
    return { type: 'SET_USER',payload :user}
}
export const startSetUser = () => {
    return(dispatch) => {
        axios.get('/users/account',{
            headers : {
               'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const user = response.data
            dispatch(setUser(user))
            })
        .catch((err) => {
            console.log(err)
        })
    }   
}
export const startLogin = (formData,redirect) => {
    return (dispatch) => {
        axios.post('/users/login',formData)
        .then(response => {
            if(response.data.hasOwnProperty('error')){
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
                console.log("account",response.data.token)
                localStorage.setItem('authToken',response.data.token)
                //redirect()
                axios.get('/users/account',{
                    headers : {
                        'x-auth' : localStorage.getItem('authToken')
                    }
                })
                .then((response) => {
                    const user = response.data
                    console.log("user login",user)
                    dispatch(setUser(user))
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text:   'You have successfully logged in',
                            confirmButtonText: 'Ok'
                        })
                        redirect()
                    
                })
            }
        })
    }

}

export const removeUser = () => {
    return { type : 'REMOVE_USER' }
}
export const startLogout = () => {
    return (dispatch) => {
        axios.delete('/users/logout', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) =>{
            if(response.data.notice){
                localStorage.removeItem('authToken')
                dispatch(removeUser())
                window.location.href = "/"
            }
        })
    }
}
