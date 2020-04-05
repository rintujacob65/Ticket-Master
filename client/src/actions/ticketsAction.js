import axios from '../config/axios'

export const startSetTickets = () => {
    return (dispatch) => {
        axios.get('/tickets',{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const tickets = response.data 
            console.log("tickets",tickets)
            dispatch(setTickets(tickets))
        })
    }
}
export const setTickets = (tickets) => {
    return {
        type : 'SET_TICKETS',
        payload : tickets
    }
}
//async
export const startAddTicket = (formData,redirect) => {
    console.log("formdta",formData)
    return(dispatch) => {
        axios.post('/tickets',formData,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response) => {
          const ticket = response.data
          console.log("ticket response data",ticket)
          dispatch(addTicket(ticket))
          redirect()
          })
          .catch(err => {
              console.log(err)
          })
    }
}
export const addTicket = (ticket) => {
    return {
        type : 'ADD_TICKET',
        payload : ticket
    }
}

export const removeTicket = (id) => {
        return {
            type : 'REMOVE_TICKET' ,payload: id
        }
}
export const startRemoveTicket = (id) => {
    return(dispatch) => {
        axios.delete(`/tickets/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
             }
        })
        .then((response) => {
            const ticket = response.data
            dispatch(removeTicket(ticket._id))
        })
    }
}
export const startUpdateTicket = (formData,id,redirect) => {
     return(dispatch) => {
         axios.put(`/tickets/${id}` , formData, {
             headers : {
                 'x-auth' : localStorage.getItem('authToken')
             }
         })
         .then((response) => {
             const ticket = response.data
             dispatch(updateTicket(ticket))
         })
     }
}

export const updateTicket = (ticket) =>{
    return {
        type : 'UPDATE_TICKET',
        payload : ticket
    }
}

 export const startUpdateStatus = (obj) => {
     console.log("obj",obj)
 return(dispatch)=>{
     axios.put(`/tickets/${obj.id}`,obj.status,{
         headers : {
             'x-auth' : localStorage.getItem('authToken')
         }
     })
     .then((response)=>{
         console.log("check response",response.data)
         dispatch(updateStatus(response.data))
     })
 }
}
export const updateStatus = (ticket) => {
    return { type :'UPDATE_STATUS',payload:ticket}
}