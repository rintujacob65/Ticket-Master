import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { startSetUser, setUser } from './actions/userAction'
import { startSetCustomers } from './actions/customersAction'
import { startSetDepartments } from './actions/departmentsAction'
import { startSetEmployees } from './actions/employeesAction'
import { startSetTickets } from './actions/ticketsAction'
import 'bootstrap/dist/css/bootstrap.css' //npm install bootstrap

const store = configureStore()
// console.log(store.getState())

// store.subscribe(() => {
//     console.log(store.getState())
    
// })

//handle page reloads
if(localStorage.getItem('authToken')){
    store.dispatch(startSetUser())
    store.dispatch(startSetCustomers())
    store.dispatch(startSetDepartments())
    store.dispatch(startSetEmployees())
    store.dispatch(startSetTickets())
}
const jsx = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('root'))