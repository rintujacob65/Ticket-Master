import React from 'react'
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'
import Login from './components/x-auth/Login'
import Register from './components/x-auth/Register'
import { connect } from 'react-redux'
import Account from './components/x-auth/Account'
import CustomerList from './components/customers/List'
import CustomerShow from './components/customers/Show'
import CustomerNew from './components/customers/New'
import CustomerEdit from './components/customers/Edit'
import DepartmentList from './components/Departments/List'
import DepartmentShow from './components/Departments/Show'
import DepartmentEdit from './components/Departments/Edit'
import EmployeeList from './components/employees/List'
import EmployeeShow from './components/employees/Show'
import EmployeeNew from './components/employees/New'
import EmployeeEdit from './components/employees/Edit'
import TicketList from './components/Tickets/List'
import TicketShow from './components/Tickets/Show'
import TicketNew from './components/Tickets/New'
import TicketEdit from './components/Tickets/Edit'
import { startLogout } from './actions/userAction'
import Home from './components/Home/index'

function App(props){
    const handleLogout = () => {
        props.dispatch(startLogout())
    }
   return(
       <BrowserRouter>
            <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="nav justify-content-end">
                <Link class="navbar-brand" to="/">  Ticket Master</Link>
                  { Object.keys(props.user).length == 0 ?(
                        <React.Fragment>
                            <li className="nav-item" style={{paddingLeft : "900px"}}>
                                <Link className="nav-link " to="/users/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link  className="nav-link" to="/users/register">Register</Link>
                            </li>
                        </React.Fragment>
                        
                    ) : (
                        <React.Fragment>
                            <li className="nav-item"  >
                                <Link className="nav-link" to="/customers">Customers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/departments">Departments</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/employees">Employees</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tickets">Tickets</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users/account">Account</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#" onClick = {() => {
                                    handleLogout()
                                }}>Logout</Link>
                            </li>
                      </React.Fragment>
                    )

                 }
                </ul>
             </nav>
              
               <Switch>
                 <Route path = "/" component={Home} exact={true}/> 
                <Route path="/users/login" component={Login} exact={true}/>
                <Route path="/users/register" component={Register} exact={true}/>
                <Route path="/users/account" component={Account}/>
                <Route path="/customers" component={CustomerList} exact={true}/>
                <Route path="/departments" component={DepartmentList} exact={true}/>
                <Route path="/employees" component={EmployeeList} exact={true}/>
                <Route path="/tickets" component={TicketList} exact={true}/>
                <Route path="/customers/new" component={CustomerNew}/>
                <Route path="/employees/new" component={EmployeeNew}/>
                <Route path="/tickets/new" component={TicketNew}/>
                <Route path="/tickets/edit/:id" component={TicketEdit}/>
                <Route path="/employees/edit/:id" component={EmployeeEdit}/>
                <Route path="/departments/edit/:id" component={DepartmentEdit}/>
                <Route path="/customers/edit/:id" component={CustomerEdit}/>
                <Route path="/tickets/:id" component={TicketShow}/>
                <Route path="/employees/:id" component={EmployeeShow}/>
                <Route path="/departments/:id" component={DepartmentShow}/>
                <Route path="/customers/:id" component={CustomerShow}/>
               </Switch>

               
            </div>
       </BrowserRouter>
    )
}
const mapStateToProps = (state) =>{
    return {
        user : state.user
    }
}
export default connect(mapStateToProps)(App)