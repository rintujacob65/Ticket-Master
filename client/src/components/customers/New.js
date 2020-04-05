import React from 'react'
import CustomerForm from './Form'
import { connect } from 'react-redux'
import { startAddCustomer } from '../../actions/customersAction'

function CustomerNew(props){
    const handleSubmit = (formData) => {
        const redirect = () => props.history.push('/customers')
        props.dispatch(startAddCustomer(formData,redirect))
    }
    return(
        <div className="row">
            <div className="col-md-6 offset-md-3" >
                <h2 className="text-center" style = {{marginTop:"30px"}}>
                    Add Customer
                </h2>
                    <CustomerForm handleSubmit={handleSubmit}/>
            </div>        
        </div>
    )
}
export default connect()(CustomerNew)
