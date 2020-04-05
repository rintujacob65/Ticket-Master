import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { findDepartment } from '../../selectors/departmentSelector'
import { Link } from 'react-router-dom'

class DepartmentForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name : props.department ? props.department.name : ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name : this.state.name
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
                    <div className="form-group  col-md-5">
                    <input type="text"
                          value={this.state.name}
                          onChange={this.handleChange} 
                          name="name"
                          className="form-control form-control-sm"/>
                    </div>
                    <div className = "col-md-3 ">
                        <input 
                            type="submit"
                            className="btn btn-primary  m-3" />
                            <Link to="/departments" >
                        <button type="button" class="btn btn-primary">
                            Back
                        </button>
                   </Link>
                    </div> 
                  
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return{
        department : findDepartment(state.departments,id)
    }
}
export default withRouter(connect(mapStateToProps)(DepartmentForm))