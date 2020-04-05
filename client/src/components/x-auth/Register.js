import React from 'react'
import { connect } from 'react-redux'
import { startRegister } from '../../actions/userAction'

class Register extends React.Component{
    constructor(){
        super()
        this.state ={
            username :'',
            email:'',
            password :''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData={
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        const redirect = () => {
            return this.props.history.push('/users/login')
        }
       this.props.dispatch(startRegister(formData,redirect))
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <h2>Register with us</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" id="username"
                            value={this.state.username}
                            name="username"
                            onChange={this.handleChange}
                            placeholder="username"
                            className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="text" id="email"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleChange}
                            placeholder="email"
                            className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password"
                            value={this.state.password}
                            name = "password"
                            onChange={this.handleChange}
                            placeholder="password"
                            className="form-control"/>
                     </div>
                     
                        
                     <input type="submit" 
                        className="btn btn-primary btn-block"
                        value="register"/>
                </form>
                </div>
               
            </div>
        )
    }
}
export default connect()(Register)