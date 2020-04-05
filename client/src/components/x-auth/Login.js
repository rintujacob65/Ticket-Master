import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../../actions/userAction'

class Login extends React.Component{
    constructor(){
        super()
        this.state ={
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
            email : this.state.email,
            password : this.state.password
        }
        const redirect = () => this.props.history.push('/')
       this.props.dispatch(startLogin(formData,redirect))
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <h2>Login with us</h2>
                <form onSubmit={this.handleSubmit}>
                     <div className="form-group">
                        {/* <label htmlFor="email">Email</label> */}
                        <input type="text" id="email"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="email"/>
                     </div>
                     <div className="form-group">
                        <input type="password" id="password"
                            value={this.state.password}
                            name = "password"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="password"/>
                     </div>
                     
                     <input type="submit" 
                            className="btn btn-primary btn-block"
                            value="Login"/>
                </form>

                </div>
            </div>
        )
    }
}
export default connect()(Login)