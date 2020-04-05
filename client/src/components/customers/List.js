import React from 'react'
import { connect } from 'react-redux'
import { startSetCustomers,startRemoveCustomer } from '../../actions/customersAction'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { MDBDataTable } from 'mdbreact'


function CustomerList(props){
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
              props.dispatch(startRemoveCustomer(id))
            }
            
          })
   }
    if(props.customers.length == 0){
        props.dispatch(startSetCustomers())
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
                label: 'Actions',
                field: 'actions'
            }
        ],
        rows: props.customers.map(customer => ({
            name: <Link to={`/customers/${customer._id}`}>{customer.name}</Link>, 
            email: customer.email,
            mobile: customer.mobile,
            actions: <div className="row">
                        <div className="col-md-4 offset-md-2">
                            <Link to={`/customers/${customer._id}`} 
                                className="btn btn-primary  btn-sm">
                                    Show
                            </Link>
                         </div>
                         <div className="col-md-4 ">
                            <button className="btn btn-danger btn-sm" 
                                onClick={() => {
                                handleRemove(customer._id)
                            }}> Remove </button>
                        </div>
            </div>
            
            
        }))
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                <h2>Listing Customers - {props.customers.length} </h2>
                
                <MDBDataTable 
                   striped 
                   bordered
                   data={data}
                />
               
                <Link to="/customers/new" className="btn btn-primary">Add Customer</Link>
            </div>
            </div>

           
        </div> 
    )
}
const mapStateToProps = (state) => {
    return {
        customers : state.customers
    }
}
export default connect(mapStateToProps)(CustomerList)