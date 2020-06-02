import React from 'react';
import ReactDOM from "react-dom";
import { Route, Switch } from 'react-router-dom'


import Navbar from './components/Navbar';
// import Landing from './components/Landing';
import Landing from './components/Landing'
import Home from './components/home/Home';
import Login from './components/Login'
import Signup from './components/Signup'
import UserProfile from './components/UserProfile'
// import Today from './components/Today';
// import Following from './components/Following';
// import SearchBar from './components/SearchBar';
// import Notifications from './components/Notifications';
// import Messages from './components/Messages';
// import UserPage from './components/AllUsers';
// import Accounts from './components/Accounts';
// import Error from './components/Error';

import CreatePin from './components/pins/CreatePin'


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
    <div className="Mocktrist-app">
    
        <AuthProvider> 
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

            <Route exact path="/settings/edit-profile">
              <EditProfile/>
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

            <Route exact path="/create-pin"> 
              <CreatePin/>
            </Route>

            <Route exact path="/pins/search-results">
              <SearchResults/>
            </Route>

            <ProtectedRoute exact path="/user-profile">
              <UserProfile/>
            </ProtectedRoute>

            

            </Switch>
          </AuthProvider>
        
        </div>
  );
}

export default App;









