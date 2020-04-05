import React from 'react'
import { connect } from 'react-redux'
import { findTicket } from '../../selectors/ticketSelector'
import { Link } from 'react-router-dom'

function TicketShow(props){
    const { _id,code,customer,department,employees,message,priority} = props.ticket || {}
    return(
        <div className="container col-md-6 mt-5">
           {
               props.ticket ? (
                   <div className="card text-center" style={{width: "18rem;"}}>
                       <div className="card-body">
                            <p className="card-text">Code - {code}</p>
                            <p className="card-text">Customer - 
                                {
                            props.ticket  !== 0 && 
                            ( props.ticket.customer !== 0 && (
                                    props.customers.find(
                                    customer =>
                                    customer._id ==
                                    props.ticket.customer).name
                                )
                            )
                            }
                            </p>
                            <p className="card-text">
                                Department - 
                                { props.ticket  !== 0 && ( 
                                    props.ticket.department !== 0 && (
                                        props.departments.find(
                                        department =>
                                        department._id ==
                                        props.ticket.department).name
                                    )
                                )
                                }
                            </p>
                            <p className="card-text">
                                Employees - {props.employees.length !== 0 && (
                            props.ticket.employees.length > 0 && 
                                props.ticket.employees.map((employee,i) => {
                                    return (
                                        <span key={i}>
                                            { " "}
                                            {
                                                props.employees.find(
                                                    employee =>
                                                employee._id == 
                                            props.ticket.employees[i]._id
                                                ).name
                                            }
                                        </span>
                                    )
                                })
                            )}
                            </p>
                            <p className="card-text">
                                Message - {message}
                            </p>
                            <p className="card-text">
                                Priority - {priority}
                            </p>
                       </div>
                       <p>
                       <Link to={`/tickets/edit/${_id}`} >
                            <button type="button" className="btn btn-primary m-3 ">
                                Edit
                            </button>
                        </Link>
                        <Link to="/tickets" >
                           <button type="button" className="btn btn-primary">
                               Back
                            </button>
                        </Link>
                        </p>
                    </div>
               ) : (
                   <div>
                       <p>loading.....</p>
                    </div>
               )
           }
        </div>
    )
 }

const mapStateToProps = (state,props) => {
   const id = props.match.params.id
   return {
       ticket : findTicket(state.tickets,id),
       customers : state.customers,
       departments : state.departments,
       employees : state.employees
   }
}
export default connect(mapStateToProps)(TicketShow)
