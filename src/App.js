import './App.scss';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Route, Switch } from 'react-router';
import LoggedIn from './pages/LoggedIn';
import Header from './components/Header';
import React from 'react';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  const [user, setUser] = useState(null);

  const userDetails = (details) => {
    setUser(details);
  }

  return (
    <div className="App">
      <Router>
          <Header user={user} ></Header>
          <section>
            <Switch>
              <Route path="/">
                  <LoggedIn userDetails={userDetails} ></LoggedIn>
              </Route>
            </Switch>
          </section>
          <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6">
                        Footer
                  </Typography>              
                </Toolbar>
            </AppBar>
      </Router>
    </div>
  );
}

export default App;
