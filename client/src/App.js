import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Navbar from './layout/Navbar';
import SideView from './components/myProjects/SideView';
import Login from './components/myProjects/Login';
import TaskCreate from './components/myProjects/TaskCreate';
import ShareMenu from './components/myProjects/ShareMenu';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import MomentUtils from '@date-io/moment';
import NewLegend from './components/myProjects/NewLegend';
import Dashboard from './components/myProjects/Dashboard';
import Home from './container/Home';
import Notifications from './components/myProjects/Notifications';
import DateTime from './components/myProjects/DateTime';


import { loadUser } from './store/action/auth';
import setAuthToken from './utils/setAuthToken';
import Signup from './components/myProjects/Signup';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {


  const dispatch = useDispatch();
  const projectObj = useSelector(state => state.project);
  console.log("fecthed projects are: ", projectObj.projects); //for all projects

  //get user details if user is logged in already
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    localStorage.getItem("token") && socket.getInstance(isAuthenticatedVal.user.name); //user name here
  }, [isAuthenticatedVal]);


  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>

      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/side-view' component={Dashboard} />
            <Route exact path='/login' component={Login} />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 24 }}>
              <Route exact path='/signup' component={Signup} />
            </div>
            <Route exact path='/task-create' component={TaskCreate} />
            <Route exact path='/notifications' component={Notifications} />
            <Route exact path='/date-time' component={DateTime} />
          </Switch>
        </Fragment>
      </Router>
    </MuiPickersUtilsProvider>
  )

}

export default App;
