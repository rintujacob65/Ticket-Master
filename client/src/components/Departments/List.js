import React from 'react'
import { connect } from 'react-redux'
import { startSetDepartments } from '../../actions/departmentsAction'
import { Link } from 'react-router-dom'
import DepartmentNew from '../Departments/New'
import { startRemoveDepartment } from '../../actions/departmentsAction'
import Swal from 'sweetalert2'
import { MDBDataTable } from 'mdbreact'

function DepartmentList (props){
   const handleRemove = (id) => {
       Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  props.dispatch(startRemoveDepartment(id))
                }
                
              })
    }
    if(props.departments.length == 0){
        props.dispatch(startSetDepartments())
    }

    
    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name'
            },
            {
                label: 'Actions',
                field: 'actions'
            }
        ],
        rows: props.departments.map(department => ({
            name : department.name,
            actions: <div className="row">
                    <div className="col-md-6 offset-md-1">
                    <Link to={`/departments/${department._id}`}>
                            <button className="btn btn-primary btn-sm">
                                Show
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <button className="btn btn-danger btn-sm" 
                            onClick={ () => {
                                    handleRemove(department._id)
                                     }}>Remove
                        </button>
                    </div>
            </div>
    
        }))
    }


    return(
     <div className="container col-md-6 mt-5">
           {
               props.departments ? (
                   <div>
                        <h2>Departments -{props.departments.length}</h2>

                        <MDBDataTable 
                            striped 
                            bordered
                            data={data}
                       />
            <DepartmentNew/>
                    </div>
               ):(
                   <div>
                       <p> loading...</p>
                   </div>
               )
           }
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        departments : state.departments
    }
} 
export default connect(mapStateToProps)(DepartmentList)