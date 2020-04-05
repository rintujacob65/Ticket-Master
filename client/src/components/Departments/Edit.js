import React from 'react'
import Form from '../Departments/Form'
import {startUpdateDepartment} from '../../actions/departmentsAction'
import { connect } from 'react-redux'

function DepartmentEdit(props){
    const handleSubmit = (formData) => {
        const id = props.match.params.id
        const redirect = () => props.history.push('/departments')
        props.dispatch(startUpdateDepartment(formData,id,redirect))
    }
    return(
        <div className="container mt-5">
            <h2 > Edit Department</h2>
            <Form handleSubmit={handleSubmit}/>
        </div>
    )
}
export default connect()(DepartmentEdit)