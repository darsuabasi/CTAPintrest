import React from 'react';
import ReactDOM from "react-dom";
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import Landing from './components/Landing'
import Home from './components/home/Home';
import Login from './components/Login'
import Signup from './components/Signup'

import Today from './components/Today';
// import SearchBar from './components/SearchBar';
// import Notifications from './components/Notifications';
// import Messages from './components/Messages';
// import UserPage from './components/AllUsers';
// import Accounts from './components/Accounts';
// import Error from './components/Error';

import Boards from './components/Boards'
import UserPins from './components/UserPins'

import CreatePin from './components/pins/CreatePin'
import CreateBoard from './components/CreateBoard'
import AllUsersFollowing from './components/AllUsersFollowing'
import AuthProvider from './providers/AuthProvider'
import { AuthRoute, ProtectedRoute } from './util/auth_routes'


import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import Pins from './components/Pin'

// import Pin from './components/pins/SinglePin';
// import Pins from './components/pins/AllPins'

import Settings from './components/Settings';
import EditProfile from './components/EditProfile';
import AccountSettings from './components/AccountSettings';


import SearchResults from './components/SearchResults'




const App = () => {
  return (
  <AuthProvider> 
    <div className="Mocktrist-app">
    
          <Navbar/>
            <Switch>

            <Route exact path="/">
              <Landing/> 
            </Route>
    
            <ProtectedRoute exact path="/user-feed">
              <Home/>
            </ProtectedRoute>

            <ProtectedRoute exact path="/following">
              <AllUsersFollowing/>
            </ProtectedRoute>

            <Route exact path="/settings">
              <Settings/>
            </Route>


          {/* <Switch> */}
            <ProtectedRoute exact path="/user-profile/boards">
              <Boards/>
            </ProtectedRoute>

            <ProtectedRoute exact path="/user-profile/pins">
              <UserPins/>
            </ProtectedRoute>

            <Route exact path="/settings/edit-profile">
              <EditProfile/>
            </Route>
          {/* </Switch>   */}

            <Route exact path="/today">
              <Today/>
            </Route>



            <Route exact path="/settings/account-settings">
              <AccountSettings/>
            </Route>

            <AuthRoute path="/signup">
              <Signup/> 
            </AuthRoute>

            <AuthRoute path="/login">
               <Login/> 
            </AuthRoute> 

            <ProtectedRoute exact path="/create-pin"> 
              <CreatePin/>
            </ProtectedRoute>

            <ProtectedRoute exact path="/create-board">
              <CreateBoard/>
            </ProtectedRoute>

            <Route exact path="/pins/search-results">
              <SearchResults/>
            </Route>
            </Switch>
        
        </div>
      </AuthProvider>
  );
}

export default App;









