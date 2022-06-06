import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About.js'
import Register from './components/Register'
import Login from './components/Login'
import Adminlogin from './components/Adminlogin'
import Admindashboard from './components/Admindashboard';
import { Box } from '@material-ui/core';
import { BrowserRouter, Switch, Route ,Redirect} from 'react-router-dom';
import UpdateWeeklymenuAdmin from './components/UpdateWeeklymenuAdmin';
import { useSelector } from 'react-redux';
function App() {
  const admin = useSelector((state) => state.admin.currentAdmin);
  return (
    <>
      <BrowserRouter forceRefresh={true}>
        <Navbar />
        <Box style={{ margintop: 64 }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/about' component={About} />
            <Route exact path='/adminlogin' component={Adminlogin} />
            <Route
              exact
              path="/updateweeklymenu/:id"
              render={(props) =>
                admin ? (
                  <UpdateWeeklymenuAdmin {...props} />
                ) : (
                  <Redirect to="/adminlogin" />
                )
              }
            />
            <Route exact path='/admindashboard' component={Admindashboard} />
          </Switch>
        </Box>
      </BrowserRouter>
    </>
  );
};
export default App;