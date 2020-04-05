import React from 'react'
import { startUpdateStatus } from '../../actions/ticketsAction'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { MDBDataTable } from 'mdbreact'

class CompletedTicket extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    handleChange = (id) => {
        const status = {
            isResolved : false
        }
        this.props.dispatch(startUpdateStatus({id,status}))
    }
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
                             <th>Incomplete</th>
                         </tr>
                     </thead>
                     <tbody>
                     {  
                       this.props.tickets.map(ticket => {
                           if(ticket.isResolved){
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
export default connect(mapStateToProps)(CompletedTicket)