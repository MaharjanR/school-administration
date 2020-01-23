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
import withContext from './Context';

const PublicWithContext = withContext(Public);

function App() {
  return (
    <Router>
      <React.Fragment>
        <Header />       
        <hr />
        <Switch>
          <Route exact path='/' component={PublicWithContext} />
          <Route path='/create' component={Create} />
          <Route path='/detail' component={Detail} />
          <Route path='/error' component={Errors} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
