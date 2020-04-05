import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startSetTickets ,startRemoveTicket} from '../../actions/ticketsAction'
import Swal from 'sweetalert2'
import { startSetCustomers } from '../../actions/customersAction'
import { startSetDepartments } from '../../actions/departmentsAction'
import { startSetEmployees } from '../../actions/employeesAction'
import PendingTicket from './PendingTicket'
import CompletedTicket from './CompletedTicket'
import { Progress} from 'reactstrap' 
import PieChart from './PieChart'
import BarChart from './BarChart'

class TicketList extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            pending : true,
            complete :false
        }
    }
    handlePending = () => {
        this.setState({
            pending : true,
            complete : false
        })
    }
    handleComplete = () => {
        this.setState({
            pending : false,
            complete : true
        })
    }
  
     handleRemove = (id) => {
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
              this.props.dispatch(startRemoveTicket(id))
            }
            
          })
    } ///Remove completed
   
    
   render(){
    if(this.props.tickets.length  == 0){
        this.props.dispatch(startSetCustomers())
        this.props.dispatch(startSetDepartments())
        this.props.dispatch(startSetEmployees())
        this.props.dispatch(startSetTickets())
    }
    return(
        <div className="container mt-5"> 
          {
          (this.props) ? (
              <div>
                 <h2>Listing Tickets-{this.props.tickets.length}</h2>
                 <nav className=" navbar navbar-expand-lg navbar-light bg-light">
                  <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                     <li className="nav-item active">
                        <button className="nav-link" onClick={
                            this.handlePending
                        }>
                            Pending
                            <span className="sr-only">(current)</span>
                        </button>
                     </li>
                     <li className="nav-item active">
                        <button className="nav-link" onClick={
                            this.handleComplete
                        }>
                            Completed
                         </button>
                     </li>
                    </ul>
                  </div>
                </nav>
                {/* <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand">Navbar</a>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" 
                                placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" 
                                type="submit">Search</button>
                        </form>
                </nav> */}
                {/* <Tab/> */}
                {
                    this.state.pending && <PendingTicket/>
                }
                 {
                    this.state.complete && <CompletedTicket/>
                }
                  <Link to="/tickets/new">
                    <button className="btn btn-primary">
                        Add Ticket
                    </button>
                   </Link>
                 

                  {/* progressbar */}
                  <Progress  animated style={{marginTop:"20px"}} value= {
                         this.props.tickets.filter( ticket =>ticket.isResolved)
                         .length/this.props.tickets.length * 100 
                         } 
                 />
                 <div className="container">
                     <h3 style={{textAlign : "center",marginTop: "20px"}}>
                         Data on Pending Tickets
                    </h3>
                    <div className="row">
                        <div className="col-md-6">
                            <PieChart/>
                        </div>
                        <div className="col-md-6" style={{marginTop : "15px"}}>
                            <BarChart/>
                        </div>
                    </div>
                 </div>
                </div>
            ):(
                <div>
                    <p>loading...</p>
                </div>
            )
            }
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
export default connect(mapStateToProps)(TicketList)
