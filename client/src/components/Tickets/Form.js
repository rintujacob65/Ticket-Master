import React from 'react'
import { connect} from 'react-redux'
import Select from 'react-select'
import {withRouter} from 'react-router-dom'
import { findTicket } from '../../selectors/ticketSelector'
import { Link } from 'react-router-dom'

class TicketForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            code : props.ticket ? props.ticket.code :'',
            customer : props.ticket ? props.ticket.customer :'',
            department :props.ticket ? props.ticket.department :'',
            // employees: [],
            employeesNewList :[],
            tempEmployee : [],
            employee :props.ticket ? props.ticket.employee : [],
            message : props.ticket ? props.ticket.message : '',
            priority : props.ticket ? props.ticket.priority : ''
         }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            code :this.state.code,
            customer: this.state.customer,
            department : this.state.department,
            employees : this.state.employee,
            message : this.state.message,
            priority : this.state.priority,
        }
        console.log("formData",formData)
        this.props.ticket && (formData.id = this.props.ticket._id)
        this.props.handleSubmit(formData)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        let tempEmployee = []
        {
            this.props.employees.map(employee=>{
                return(
                    tempEmployee.push({
                        value :employee.name,
                        _id : employee._id,
                        name : employee._id,
                        label : employee.name,
                        deptId : employee.department._id
                    })
                )
            })
            this.setState({tempEmployee})
        }
       if(e.target.name === 'department')
        {
            this.setState({
            employeesNewList:this.state.tempEmployee.filter(employee =>
            employee.deptId === e.target.value )})      
            console.log("employeeNewList",this.state.employeesNewList)
        }
    }
   
    handleMultiChange = (option) => {
        this.setState(()=>{
            return {
                employee : option
            }
        })
    }
    render(){
       
        return(
            <div className="container">
               <form onSubmit={this.handleSubmit}>
                   <div className="form-group ">
                    <label htmlFor="code">Code</label>
                        <input type="text" name="code"
                         value={this.state.code}
                        onChange={this.handleChange} id="code"
                        className="form-control"/>
                   </div>
                   <div className="form-group ">
                    <label htmlFor="customer">Customer</label>
                        <select id = "customer" value = {this.state.customer}
                            onChange = {this.handleChange}
                            name = "customer" className="form-control"
                            >
                            <option value="">Select</option>
                            {
                            this.props.customers.map(customer => {
                                return <option key={customer._id} 
                                            value={customer._id}>
                                            {customer.name}
                                        </option>
                            })}
                        </select>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="department">Department</label>
                        <select id = "department" value = {this.state.department}
                            onChange = {this.handleChange}
                            name = "department" className="form-control"
                            >
                            <option value="">Select</option>
                            {
                            this.props.departments.map(department => {
                                return <option key={department._id} 
                                            value={department._id}>
                                            {department.name}
                                        </option>
                            })}
                        </select>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="employees">Employee</label>
                        <Select 
                            id = "employee"
                            name = "employee"
                            placeholder ="Select"
                            options = {this.state.employeesNewList}
                            onChange = {this.handleMultiChange}
                            isMulti 
                            value ={this.state.employee} 
                        />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="message">Message</label>
                        <textarea value={this.state.message} 
                            onChange={this.handleChange} name="message"
                            className="form-control">
                        </textarea>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="priority">Priority</label>
                        <div class="form-check form-check-inline pl-3">
                            <input type="radio" checked={this.state.priority === "High"} 
                            value = "High" name="priority" 
                            onChange={this.handleChange} 
                            className="form-check-input "/>
                            <label  className="form-check-label">High</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input type="radio" checked={this.state.priority === "Medium"} 
                            name="priority"  value = "Medium"
                            onChange={this.handleChange}
                            className="form-check-input"/>
                            <label  className="form-check-label">Medium</label>
                        </div>
                        
                        <div class="form-check form-check-inline">
                            <input type="radio" checked={this.state.priority === "Low"} 
                            name="priority" value = "Low"
                            onChange={this.handleChange}
                            className="form-check-input"/>
                            <label  className="form-check-label">
                                Low
                            </label>
                        </div>
                       

                    </div>
                    <input type="submit"  className="btn btn-primary m-3"
                        value="submit"/>
                  <Link to="/tickets" >
                        <button type="button" class="btn btn-primary">
                            Back
                        </button>
                   </Link>
               </form>
            </div>
        )
    }
}
const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        customers : state.customers,
        departments : state.departments,
        employees : state.employees,
        ticket : findTicket(state.tickets,id)
    }
}
export default withRouter(connect(mapStateToProps)(TicketForm))