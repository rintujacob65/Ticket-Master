import axios from '../config/axios'

export const startSetDepartments = () => {
    return(dispatch) => {
        axios.get('/departments',{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const departments = response.data
            dispatch(setDepartments(departments))
        })
    }
}

export const setDepartments = (departments) => {
    return { 
        type : 'SET_DEPARTMENTS',
        payload : departments
    }
}
export const startAddDepartment = (formData) => {
    return(dispatch) => {
        axios.post('/departments',formData,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const department = response.data
            dispatch(addDepartment(department))
        })  
    }
}
export const addDepartment = (department) => {
    return { type :'ADD_DEPARTMENT',payload : department}
}

export const startUpdateDepartment = (formData, id,redirect) => {
    return(dispatch) => {
        axios.put(`/departments/${id}`, formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const department = response.data
            dispatch(updateDepartment(department))
            redirect()
        })
    }
}

export const updateDepartment = (department) => {
    return{
        type :'UPDATE_DEPARTMENT' , payload : department
    }
}
export const startRemoveDepartment = (id) => {
    return(dispatch) => {
        axios.delete(`/departments/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const department = response.data
            dispatch(removeDepartment(department._id))
        })
    }
}
export const removeDepartment = (id) => {
    return {
        type :'REMOVE_DEPARTMENT' ,payload : id
    }
}