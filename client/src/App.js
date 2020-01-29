import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header';
import Public from './components/Public';
import Create from './components/Create';
import Detail from './components/Detail';
import Errors from './components/Error';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import withContext from './Context';

const HeaderUpWithContext = withContext(Header);

const PublicWithContext = withContext(Public);
const DetailWithContext = withContext(Detail);
const SignInWithContext = withContext(SignIn);
const SignUpWithContext = withContext(SignUp);

function App() {
  return (
    <Router>
      <React.Fragment>
        <HeaderUpWithContext />       
        <hr />
        <Switch>
          <Route exact path='/' component={PublicWithContext} />
          <Route path='/create' component={Create} />
          <Route path='/signin' component={SignInWithContext} />
          <Route path='/signup' component={SignUpWithContext} />
          <Route path='/courses/:id' component={DetailWithContext} />
          <Route path='/error' component={Errors} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
