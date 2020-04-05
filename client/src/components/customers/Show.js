import React from 'react'
import { connect } from 'react-redux'
import {findCustomer} from '../../selectors/customerSelector'
import { Link } from 'react-router-dom'

function CustomerShow (props){
    const { _id,name,email,mobile} = props.customer || {}
    return(
        <div className="container col-md-6 mt-5">
            {
                props.customer ? (
                    <div className="card text-center" style={{width: "18rem;"}}>
                        <div className="card-body">
                            <h5 className="card-title">Customer Show -{_id}</h5>
                            <p className="card-text">{name}</p>
                            <p className="card-text">{email}</p>
                            <p className="card-text">{mobile}</p>
                            <Link to={`/customers/edit/${_id}`} >
                                <button type="button" className="btn btn-primary m-3 ">
                                    Edit
                                </button>
                            </Link>
                            <Link to="/customers" >
                                <button type="button" className="btn btn-primary">
                                    Back
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>loading....</p>
                    </div>
                )
            }
            
        </div>
    )
}
const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return{
        customer : findCustomer(state.customers,id)
    }
}
export default connect(mapStateToProps)(CustomerShow)