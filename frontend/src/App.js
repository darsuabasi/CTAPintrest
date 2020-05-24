import React from 'react';
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom'
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';
import Today from './components/Today';
import Following from './components/Following';
import SearchBar from './components/SearchBar';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import UserPage from './components/AllUsers';
import Accounts from './components/Accounts';
import Error from './components/Error';

import Signup from './components/Signup'
import Login from './components/Login'

import AllUsers from './components/AllUsers'

const App = () => {
  return (
    
    <div>
    <BrowserRouter> 
      <Navbar/>

      {/* <Route to="/">
        <Landing/>
      </Route> */}

      <Route exact path="/">
        <Home/>
      </Route>

      <Route path="/users">
        <AllUsers/>
      </Route>

      <Route path="/signup">
        <Signup/> 
      </Route>

      <Route path="/login">
        <Login/> 
      </Route>



      {/* <Switch>

      <Route exact path={"/"}>
            <Landing/>
        </Route>

        <Route exact path={"/"}>
            <Home/>
        </Route>

        <Route exact path={"/"}>
            <Today/>
        </Route>

        <Route exact path={"/"}>
            <Following/>
        </Route>

        <Route exact path={"/"}>
            <Notifications/>
        </Route>

        <Route exact path={"/"}>
            <Messages/>
        </Route>

      </Switch> */}



    </BrowserRouter>
    </div>
  );
}

export default App;



