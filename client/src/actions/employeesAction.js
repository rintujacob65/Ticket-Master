import axios from '../config/axios'
import swal from 'sweetalert'

export const startSetEmployees = () => {
    return(dispatch) =>{
        axios.get('/employees', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const employees = response.data
            dispatch(setEmployees(employees))
        })
    }
}

export const setEmployees = (employees) => {
    return {
        type : 'SET_EMPLOYEES', payload : employees
    }
}

export const startAddEmployee = (formData,redirect) => {
    return(dispatch) => {
        axios.post('/employees',formData,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if(response.data.errors){
                swal(`${response.data.message}`,"","error")
               } 
            else {
                const employee = response.data
                dispatch(addEmlpoyee(employee))
                redirect()
               }
        })
    }
}
export const addEmlpoyee = (employee) => {
    return {
        type :'ADD_EMPLOYEE', payload:employee
    }
}
export const startUpdateEmployee = (formData, id, redirect) => {
    return(dispatch) => {
        axios.put(`/employees/${id}`, formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const employee = response.data
            console.log("update",employee)
            dispatch(updateEmployee(employee))
            redirect()
        })
    }
}
export const updateEmployee = (employee) => {
    return {
        type : 'UPDATE_EMPLOYEE',payload : employee
    }
}
export const startRemoveEmployee = (id) => {
    return(dispatch) => {
        axios.delete(`/employees/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const employee = response.data
            dispatch(removeEmployee(employee._id))
        })
    }
}
export const removeEmployee = (id) => {
    return { type : 'REMOVE_EMPLOYEE', payload : id}
}
