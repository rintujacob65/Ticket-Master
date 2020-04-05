import React from 'react'
import Form from '../Departments/Form'
import { startAddDepartment } from '../../actions/departmentsAction'
import { connect } from 'react-redux'

function DepartmentNew(props){
    const handleSubmit = (formData) => {
        props.dispatch(startAddDepartment(formData))
    }
    return(
        <div  className="container mt-5">
           <h4 className="text-left col px-md-5">ADD DEPARTMENT</h4>
           <Form handleSubmit = { handleSubmit}/>
        </div>
    )
}
export default connect()(DepartmentNew)