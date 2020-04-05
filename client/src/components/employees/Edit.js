import React from 'react' 
import EmployeeForm from './Form'
import { connect } from 'react-redux'
import { startUpdateEmployee } from '../../actions/employeesAction'

function EmployeeEdit(props) {
    const handleSubmit = (formData) => {
        console.log("props" ,props)
        const id = props.match.params.id
        const redirect = () => props.history.push(`/employees/${id}`)
        props.dispatch(startUpdateEmployee(formData,id,redirect))
        
    }
    return(
        <div className="container col-md-5 offset-md-3">
            <h2 className="text-center" style = {{marginTop:"30px"}}>
                Edit Employee
            </h2>
            <EmployeeForm handleSubmit={handleSubmit}/>
        </div>
    )
}
export default connect()(EmployeeEdit)