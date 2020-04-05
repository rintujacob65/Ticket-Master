import React from 'react'
import { connect } from 'react-redux'

function Account (props){
    return(
        <div className="container col-md-6 mt-5">
            <div className="card text-center" style={{width: "18rem;"}}>
                <div className="card-body">
                    <h5 className="card-title">User Account Info</h5>
                     <p className="card-text">{props.user.username}</p>
                     <p className="card-text">{props.user.email}</p>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        user : state.user
    }
}
export default connect(mapStateToProps)(Account)