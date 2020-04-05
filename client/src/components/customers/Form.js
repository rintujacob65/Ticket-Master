import React from 'react'
import { connect } from 'react-redux'
import { findCustomer } from '../../selectors/customerSelector'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

class CustomerForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name : props.customer ? props.customer.name : '',
            email :  props.customer ? props.customer.email : '',
            mobile :  props.customer ? props.customer.mobile : ''
        }
    }
   handleChange =(e)=>{
        this.setState({
           [e.target.name] : e.target.value
        })
   }
        handleSubmit =(e) => {
           e.preventDefault()
           const formData = {
               name : this.state.name,
               email : this.state. email ,
               mobile :  this.state.mobile
           }
          this.props.handleSubmit(formData)
       }
    render(){
        return(
            <div >
                <form onSubmit={this.handleSubmit}>
                <div className="form-group ">
                    <label htmlFor="name" >
                        Name
                    </label> 
                    <input type="text"
                            id="name"
                            name="name"
                            value={this.state.name} 
                            onChange = {this.handleChange}
                            className="form-control"/>
                    </div>
                  <div className="form-group ">
                    <label htmlFor="email">
                        Email
                    </label> 
                    <input type="text"
                               id="email" 
                               name="email"
                               value={this.state.email} 
                               onChange = {this.handleChange}
                               className="form-control"/>
                  </div>
                  <div className="form-group ">
                    <label  htmlFor="mobile" >
                        Mobile
                    </label> 
                    <input type="text"
                               type="text"
                                id="mobile"
                                name="mobile"
                                 value={this.state.mobile} 
                                 onChange = {this.handleChange}
                                 className="form-control"/>
                    </div>
                 <input type="submit"  className="btn btn-primary m-3"
                        value="submit"/>
                  <Link to="/customers" >
                        <button type="button" class="btn btn-primary">
                            Back
                        </button>
                   </Link>
                </form>
               
            </div>
        )
    }
}
const mapStateToProps = (state,props) =>{ 
    const id = props.match.params.id
        return{
            customer : findCustomer(state.customers,id)
        }
}
export default withRouter(connect(mapStateToProps)(CustomerForm))