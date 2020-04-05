import React from 'react'
import { connect } from 'react-redux'
import { findEmployee } from '../../selectors/employeeSelector'
import { Link } from 'react-router-dom'
import { findDepartment } from '../../selectors/employeeSelector'

function EmployeeShow(props) {
    const {_id,name,email} = props.employee || {}
    return(
        <div className="container col-md-6 mt-5">
            {
                props.employee ? (
                    <div className="card text-center" style={{width: "18rem;"}}>
                        <div className="card-body">
                        <p className="card-text">Name-{name}</p>
                        <p className="card-text">Email-{email}</p>
                        <p className="card-text">
                            Mobile-{props.employee.mobile}
                        </p>
                        <Link to={`/employees/edit/${_id}`} >
                            <button type="button" className="btn btn-primary m-3 ">
                                Edit
                            </button>
                        </Link>
                        <Link to="/employees" >
                           <button type="button" className="btn btn-primary">
                               Back
                            </button>
                        </Link>
                        </div>
                 </div>
                ):(
                    <div>
                        <p>loading..</p>
                    </div>
                )
            }
        </div>
    )
}
const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        employee : findEmployee(state.employees , id)
    }
}
export default connect(mapStateToProps)(EmployeeShow)