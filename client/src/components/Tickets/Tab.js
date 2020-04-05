import {React} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startSetTickets ,startRemoveTicket} from '../../actions/ticketsAction'
import Swal from 'sweetalert2'
import { startSetCustomers } from '../../actions/customersAction'
import { startSetDepartments } from '../../actions/departmentsAction'
import { startSetEmployees } from '../../actions/employeesAction'
import PendingTicket from './PendingTicket'
import CompletedTicket from './CompletedTicket'
import { Progress} from 'reactstrap' 
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class Tab extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            activeTab : '1'
        }
    }
     toggle = (tab) => {
        if(this.state.activeTab !== tab) 
        this.setState({activeTab:tab})
      }
   
 
    
   render(){
    
    return(
        <div> 
          {
          (this.props) ? (
              <div>
                 <h2>Listing Tickets-{this.props.tickets.length}</h2>
            <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => {this.toggle('1'); }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
            Moar Tabs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>

                </div>
            ):(
                <div>
                    <p>loading...</p>
                </div>
            )
            }
        </div>
    )
   }
 
}
const mapStateToProps = (state) => {
    return {
        customers : state.customers,
        departments : state.departments,
        employees : state.employees,
        tickets : state.tickets       
 }
}
export default connect(mapStateToProps)(Tab)