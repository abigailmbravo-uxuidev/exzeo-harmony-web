import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
//import WorkflowStep from './WorkflowStep';
//import WorkflowHeader from '../workflows/WorkflowHeader';

const Demographics = () => <h2>Demographics</h2>;
const Bus = () => <h3>Bus</h3>;
const Cart = () => <h3>Cart</h3>;

const Tacos = ({ routes }) => (
  <div>
    <h2>Tacos</h2>
    <ul>
      <li><Link to="/tacos/bus">Bus</Link></li>
      <li><Link to="/tacos/cart">Cart</Link></li>
    </ul>

    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))}
  </div>
)


////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    step: "askAdditionalCustomerData",
    path: '/demographics',
    component: Demographics,
    name: 'Demographics'
  },
  { path: '/tacos',
    component: Tacos,
    name: 'Tacos',
    routes: [
      { path: '/tacos/bus',
        component: Bus
      },
      { path: '/tacos/cart',
        component: Cart
      }
    ]
  }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>

  )}/>
)

const Workflow = () => (
  <Router>
    <div>
      <ul>
        {routes.map((route, i) => (
          <Link key={i} to={route.path}>{route.name}</Link>
        ))}
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </div>
  </Router>
);

export default Workflow;

//
//
// class Workflow extends Component {
//
//   static propTypes = {
//     startWorkflow: PropTypes.func,
//   }
//
//   static contextTypes = {
//     router: PropTypes.any,
//   }
//
//   state = {
//     workflow: {
//       steps: []
//     },
//     completedSteps: [],
//   }
//   componentWillMount = () => {
//     let steps = [
//       {
//         name: "askAdditionalCustomerData",
//         label: "Demographics",
//         link: "demographics",
//         order: 1
//       },
//       {
//         name: "askUWAnswers",
//         label: "UnderWriting Q&A",
//         order: 2,
//         link: "underwriting",
//       },
//       {
//         name: "customizeDefaultQuote",
//         label: "Customize Quote",
//         order: 3,
//         link: "customize"
//       },
//       {
//         name: "shareIt",
//         label: "Share Quote",
//         order: 4,
//         link: "share"
//       },
//       {
//         name: "billingInfo",
//         label: "Billing Info",
//         order: 5,
//         link: "billing"
//       },
//       {
//         name: "verifyWrite",
//         label: "Verify & Write policy",
//         order: 6,
//         link: "verify"
//       }];
//     this.setState({workflow: {steps}});
//   }
//   updateCompletedSteps = (completedSteps) => {
//     this.setState({ completedSteps });
//   }
//   render() {
//     const { workflow } = this.state;
//     console.log(workflow)
//     return (
//       <div className="workflow" role="article">
//         <div className="fade-in">
//           <WorkflowHeader steps={workflow.steps} completedSteps={this.state.completedSteps} />
//         </div>
//       </div>
//     );
//   }
// }

