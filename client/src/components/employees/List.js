import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startSetEmployees ,startRemoveEmployee} from '../../actions/employeesAction'
import { startSetDepartments } from '../../actions/departmentsAction'
import { MDBDataTable } from 'mdbreact'


function EmployeeList(props) {
     const handleRemove = (id) => {
        const confirmremove = window.confirm("Are you sure?")
        if(confirmremove){
            props.dispatch(startRemoveEmployee(id))
        }
    }
    if(props.employees.length == 0){
        props.dispatch(startSetEmployees())
    }

    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name'
            },
            {
                label: 'Email',
                field: 'email'
            },
            {
                label: 'Mobile',
                field: 'mobile'
            },
            {
                label: 'Department',
                field: 'department'
            },
            {
                label: 'Actions',
                field: 'actions'
            }
        ],
        rows: props.employees.map(employee => ({
            name: employee.name ,
            email: employee.email,
            mobile: employee.mobile,
            department : employee.department.name,
            actions: <div className="row">
                    <div className="col-md-4 offset-md-2">
                        <Link to={`/employees/${employee._id}`}>
                            <button className="btn btn-primary btn-sm">
                                Show
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-4 ">
                        <button className="btn btn-danger btn-sm" 
                            onClick={ () => {
                                    handleRemove(employee._id)
                                     }}>Remove
                        </button>
                    </div>
            </div>
    
        }))
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                <h2>Listing Employees- {props.employees.length} </h2>
                
                <MDBDataTable 
                   striped 
                   bordered
                   data={data}
                />
               
                <Link to="/employees/new" className="btn btn-primary">Add Employee</Link>
            </div>
            </div>

           
        </div> 
    )
}

const mapStateToProps = (state) => {
    return {
        employees : state.employees
    }
}
export default connect(mapStateToProps)(EmployeeList)