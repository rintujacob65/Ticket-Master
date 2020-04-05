import React from 'react' 
import EmployeeForm from './Form'
import { connect } from 'react-redux'
import { startAddEmployee } from '../../actions/employeesAction'

function EmployeeNew(props) {
    const handleSubmit = (formData) => {
        const redirect = () => props.history.push('/employees')
        props.dispatch(startAddEmployee(formData,redirect))
    }
    return(
        <div className="row">
            <div className="col-md-6 offset-md-3" >
                <h2 className="text-center" style = {{marginTop:"30px"}}>Add Employee</h2>
                <EmployeeForm handleSubmit={handleSubmit}/>
            </div>
        </div>
    )
}
export default connect()(EmployeeNew)