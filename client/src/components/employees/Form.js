import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { findEmployee } from '../../selectors/employeeSelector'
import { Link } from 'react-router-dom'

class EmployeeForm extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                name : props.employee ? props.employee.name :'',
                email :props.employee ? props.employee.email :'',
                mobile :props.employee ? props.employee.mobile :'',
                department :props.employee ? props.employee.department._id:''
            }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name : this.state.name,
            email : this.state.email,
            mobile : this.state.mobile,
            department : this.state.department
        }
       this.props.handleSubmit(formData) 
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
   }
    render(){
       return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group ">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name"
                            value={this.state.name} 
                            onChange={this.handleChange}
                            className="form-control"/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email"
                               value={this.state.email} 
                               onChange={this.handleChange}
                               className="form-control"/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" name="mobile" id="mobile"
                                value={this.state.mobile}
                                onChange={this.handleChange}
                                className="form-control"/>
                    </div>
                    <div className="form-group ">
                         <label htmlFor="department">Department</label> 
                        <select id="department" name="department"
                            value={this.state.department} 
                            onChange = {this.handleChange}
                            className="form-control">
                            <option  defaultValue>select</option>
                            { this.props.departments.map(department => {
                                return <option key={department._id}  value={department._id}>
                                    {department.name}</option>
                            })}
                            
                        </select>
                    </div>
                    <input type="submit"  className="btn btn-primary m-3"
                        value="submit"/>
                  <Link to="/employees" >
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
    return{
          departments : state.departments,
          employee : findEmployee(state.employees,id)
        }
}
export default withRouter(connect(mapStateToProps)(EmployeeForm))