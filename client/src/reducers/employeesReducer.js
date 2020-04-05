const employeeInitialState = []

const employeesReducer = (state = employeeInitialState,action) => {
    switch(action.type){
        case 'SET_EMPLOYEES' : {
            return [ ...action.payload]
        }
        case 'ADD_EMPLOYEE' : {
            return [...state,action.payload]
        }
        
        case 'REMOVE_EMPLOYEE' : {
             return state.filter(employee => employee._id != action.payload)
        }
        case 'UPDATE_EMPLOYEE' : {
            return state.map(employee => {
                if(employee._id == action.payload._id){
                    return {...action.payload}
                    //  {...employee,...action.payload}
                }
                else
                {
                    return employee
                    //{...employee}
                }
            })
        }
       default : {
            return [...state]
        }
    }
}

export default employeesReducer