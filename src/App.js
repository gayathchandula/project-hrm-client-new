import React, { Component } from 'react';
import  {useState, useEffect} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import UserContext from './userContext';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Rfid = React.lazy(() => import('./views/dashboard/Home Page/rfid'));
const ChangePassword = React.lazy(() => import('./containers/TheLayout'));
const Dashboard = React.lazy(() => import('./containers/TheLayout'));
const AddEmployeeType = React.lazy(() => import('./containers/TheLayout'));
const Attendence = React.lazy(() => import('./containers/TheLayout'));
const Employee = React.lazy(() => import('./containers/TheLayout'));
const EmployeeHome = React.lazy(() => import('./containers/TheLayout'));
const Settings = React.lazy(() => import('./containers/TheLayout'));
const EmployeeLogin = React.lazy(() => import('./views/pages/login/EmployeeLogin'));
const Admin = React.lazy(() => import('./containers/TheLayout'));
const OvertimeLogs = React.lazy(() => import('./containers/TheLayout'));
const OvertimeAcceptance = React.lazy(() => import('./containers/TheLayout'));
const OvertimeConfiguration = React.lazy(() => import('./containers/TheLayout'));
const ShiftConfiguration = React.lazy(() => import('./containers/TheLayout'));
const LeaveTypes = React.lazy(() => import('./containers/TheLayout'));
const LeaveApplication = React.lazy(() => import('./containers/TheLayout'));
const LeaveConfiguration = React.lazy(() => import('./containers/TheLayout'));
const LeaveAcceptance = React.lazy(() => import('./containers/TheLayout'));
const Updateshift = React.lazy(() => import('./containers/TheLayout'));
const Updateot = React.lazy(() => import('./containers/TheLayout'));
const Department = React.lazy(() => import('./containers/TheLayout'));
const Designation = React.lazy(() => import('./containers/TheLayout'));
const Chartsattendence = React.lazy(() => import('./containers/TheLayout'));
const Chartsot = React.lazy(() => import('./containers/TheLayout'));
const Chartsleave = React.lazy(() => import('./containers/TheLayout'));


function App () {

  const [ userData, setUserData] = useState({
    id:"",
    user: "",

  });


    return (
      <HashRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/dashboard" name="Dashboard Page" render={props => <Dashboard {...props}/>} />
              <Route exact path="/attendence" name="Attendence Log"  render={props => <Attendence {...props}/>} />
              <Route exact path="/Chartsleave" name="Chartsleave"  render={props => <Chartsleave {...props}/>} />
              <Route exact path="/Chartsot" name="Chartsot"  render={props => <Chartsot {...props}/>} />
              <Route exact path="/Chartsattendence" name="Chartsattendence"  render={props => <Chartsattendence {...props}/>} />
              <Route exact path="/employee" name="Employee"  render={props => <Employee {...props}/>} />
              <Route exact path="/Employee Home" name="EmployeeHome"  render={props => <EmployeeHome {...props}/>} />
              <Route exact path="/EmployeeLogin" name="EmployeeLogin"  render={props => <EmployeeLogin {...props}/>} />
              <Route exact path="/Department" name="Department"  render={props => <Department {...props}/>} />
              <Route exact path="/AddEmployeeType" name="AddEmployeeType"  render={props => <AddEmployeeType {...props}/>} />
              <Route exact path="/admin" name="Admin"  render={props => <Admin {...props}/>} />
              <Route exact path="/Overtime Logs" name="Overtime Logs"  render={props => <OvertimeLogs {...props}/>} />
              <Route exact path="/Overtime Acceptance" name="OvertimeAcceptance"  render={props => <OvertimeAcceptance {...props}/>} />
              <Route exact path="/Overtime Configuration" name="OvertimeConfiguration"  render={props => <OvertimeConfiguration {...props}/>} />
              <Route exact path="/Shift Configuration" name="OvertimeConfiguration"  render={props => <ShiftConfiguration {...props}/>} />
              <Route exact path="/Updateshift" name="Updateshift"  render={props => <Updateshift {...props}/>} />
              <Route exact path="/Updateot" name="Updateot"  render={props => <Updateot {...props}/>} />
              <Route exact path="/Designation" name="Designation"  render={props => <Designation {...props}/>} />
              <Route exact path="/Leave Types" name="LeaveTypes"  render={props => <LeaveTypes {...props}/>} />
              <Route exact path="/Leave Application" name="LeaveApplication"  render={props => <LeaveApplication {...props}/>} />
              <Route exact path="/leavelogs" name="leavelogs"  render={props => <Designation {...props}/>} />
              <Route exact path="/Leave configuration" name="LeaveConfiguration"  render={props => <LeaveConfiguration {...props}/>} />
              <Route exact path="/Leave Acceptance" name="LeaveAcceptance"  render={props => <LeaveAcceptance {...props}/>} />
              <Route exact path="/Change Password" name="ChangePassword"  render={props => <ChangePassword {...props}/>} />
              <Route exact path="/Settings" name="Settings"  render={props => <Settings {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route exact path="/TheLayout" name="Home" render={props => <TheLayout {...props}/>} />
              <Route path="/" name="Rfid" render={props => <Rfid {...props}/>} />
            </Switch>
          </React.Suspense>
           </UserContext.Provider>
      </HashRouter>
    );

}

export default App;
