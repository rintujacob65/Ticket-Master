import React from 'react'
import { startUpdateStatus } from '../../actions/ticketsAction'
import {Link} from 'react-router-dom'
import { connect }from 'react-redux'
import { MDBDataTable } from 'mdbreact'

class PendingTicket extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    handleChange = (id) => {
        const status = {
            isResolved : true
        }
        this.props.dispatch(startUpdateStatus({id,status}))
    }
    // const data = {
    //     columns: [
    //         {
    //             label: 'Code No',
    //             field: 'code'
    //         },
    //         {
    //             label: 'Customer',
    //             field: 'customer'
    //         },
    //        {
    //             label: 'Department',
    //             field: 'department'  
    //         },
    //         {
    //             label: 'Employees',
    //             field: 'employees'
    //         },
    //         {
    //             label: 'Message',
    //             field: 'message'
    //         },
    //         {
    //             label: 'Message',
    //             field: 'message'
    //         },
    //         {
    //             label: 'Priority',
    //             field: 'priority'
    //         },complete
    //         {
    //             label: 'Actions',
    //             field: 'actions'
    //         },
    //         {
    //             label: 'Actions',
    //             field: 'actions'
    //         }
    //     ],
    //     rows: props.employees.map(employee => ({
    //         name: employee.name ,
    //         email: employee.email,
    //         mobile: employee.mobile,
    //         department : employee.department.name,
    //         actions: <div className="row">
    //                 <div className="col-md-4 offset-md-2">
    //                     <Link to={`/employees/${employee._id}`}>
    //                         <button className="btn btn-primary btn-sm">
    //                             Show
    //                         </button>
    //                     </Link>
    //                 </div>
    //                 <div className="col-md-4 ">
    //                     <button className="btn btn-danger btn-sm" 
    //                         onClick={ () => {
    //                                 handleRemove(employee._id)
    //                                  }}>Remove
    //                     </button>
    //                 </div>
    //         </div>
    
    //     }))
    // }
    
    render(){
        return(
            <div>
                <table className="table">
                  <thead>
                         <tr>
                             <th>Code No</th>
                             <th>Customer</th>
                             <th>Department</th>
                              <th>Employees</th>
                             <th>Message</th>
                             <th>Priority</th>
                             <th>Actions</th>
                             <th>Remove</th>
                             <th>complete</th>
                         </tr>
                     </thead>
                     <tbody>
                     {  
                       this.props.tickets.map(ticket => {
                            if(!ticket.isResolved){
                                return <tr key={ticket._id}>
                                        <td>{ticket.code}</td>
  { this.props.customers.length !== 0 && (
      <td>{this.props.customers.find(customer=>customer._id == ticket.customer).name}</td>
  ) }
  {this.props.departments.length !== 0 && (
      <td>{this.props.departments.find( department =>department._id ==ticket.department).name}</td>
  )}
                       {this.props.employees.length !== 0 && (
                           <td>
                               { ticket.employees.length > 0 && 
                               ticket.employees.map((employee,i) => {
                                   return (
                                       <span key={i}>
                                           { " "}
                                           {
                                               this.props.employees.find(
                                                   employee =>
                                            employee._id == 
                                            ticket.employees[i]._id
                                               ).name
                                           }
                                       </span>
                                   )
                               })}
                       </td> )}
                                 
                                {/* <td>Employees</td> */}
                             <td>{ticket.message}</td>
                              <td>{ticket.priority}</td>
                              <td>
                                <Link to={`/tickets/${ticket._id}`}>
                                  <button className="btn btn-primary">
                                       Show
                                   </button>
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={()=>{
                                    this.handleRemove(ticket._id)
                                }}>
                                    Remove
                                </button>
                            </td>
                            <td>
                               <input type="checkbox" checked={ticket.isResolved} 
                                  onChange={() =>{
                                  this.handleChange(ticket._id)  }} name="isResolved"
                                 />
                            </td>
                            
                        </tr>
                            }
                     })

                    }
                    </tbody>
                  </table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        customers : state.customers,
        departments : state.departments,
        employees : state.employees,
        tickets : state.tickets       
 }
}
export default connect(mapStateToProps)(PendingTicket)