import React from 'react'
import { connect } from 'react-redux'
import { findDepartment } from '../../selectors/departmentSelector'
import { Link } from 'react-router-dom'

function DepartmentShow(props){
    return(
        <div className="container col-md-6 mt-5">
            { props.department ? (
                <div className="card text-center" style={{width: "18rem;"}}>
                    <div className="card-body">
                        <h5 className="card-title">Customer Id -{props.department._id}</h5>
                        <p className="card-text">{props.department.name}</p>
                        <Link to={`/departments/edit/${props.department._id}`} >
                                <button type="button" className="btn btn-primary m-3 ">
                                    Edit
                                </button>
                            </Link>
                            <Link to="/departments" >
                                <button type="button" className="btn btn-primary">
                                    Back
                                </button>
                            </Link>
                     </div>
                </div>
            ):(
                <div>
                    <p>loading...</p>
                </div>
            )}
        </div>
    )
}
const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        department : findDepartment(state.departments,id)
    }
}
export default connect(mapStateToProps)(DepartmentShow)