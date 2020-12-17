import React from 'react';
import ReactDOM from "react-dom";
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/navBar/Navbar';
import Landing from './components/landing/Landing'
import Home from './components/home/Home';
// import Login from './components/logIn/Login'
import Signup from './components/signUp/Signup'
import AboutMe from './components/about/About';

import Today from './components/Today';
// import SearchBar from './components/SearchBar';
// import Notifications from './components/Notifications';
// import Messages from './components/Messages';
// import UserPage from './components/AllUsers';
// import Accounts from './components/Accounts';
// import Error from './components/Error';

import UserBoards from './components/UserBoards';
import UserPins from './components/pins/userPins/UserPins';

import CreatePin from './components/pins/allPins/CreatePin';
import CreateBoard from './components/boards/CreateBoard';
import AllUsersFollowing from './components/AllUsersFollowing';
import AuthProvider from './providers/AuthProvider';
import { AuthRoute, ProtectedRoute } from './util/auth_routes';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import Pins from './components/Pin'

// import Pin from './components/pins/allPins/SinglePin';
// import Pins from './components/pins/allPins/Pin'

import Settings from './components/Settings';
import EditProfile from './components/editProfile/EditProfile';
import AccountSettings from './components/AccountSettings';
import TagResults from './components/searchFeature/TagResults';

import UserProfileDisplay from './components/allUserProfiles/UserProfileDisplay';




const App = () => {
  return (
  <AuthProvider> 
    <div className="Mocktrist-app">
      <Navbar/>
          <Switch>
            <Route exact path="/">
              <Landing/> 
            </Route>

            <Route exact path="/about">
              <AboutMe/>
            </Route>

            <AuthRoute path="/signup">
              <Signup/> 
            </AuthRoute>

            {/* <AuthRoute path="/login">
               <Login/> 
            </AuthRoute> */}
    
            <ProtectedRoute exact path="/user-feed">
              <Home/>
            </ProtectedRoute>

            <ProtectedRoute exact path="/following">
              <AllUsersFollowing/>
            </ProtectedRoute>

            <Route exact path="/settings">
              <Settings/>
            </Route>

            <ProtectedRoute exact path="/user-profile/boards">
              <UserBoards/>
            </ProtectedRoute>

            <ProtectedRoute exact path="/user-profile/pins">
              <UserPins/>
            </ProtectedRoute>

            <Route exact path="/settings/edit-profile">
              <EditProfile/>
            </Route>

            <Route exact path="/today">
              <Today/>
            </Route>

            <Route exact path="/settings/account-settings">
              <AccountSettings/>
            </Route> 

            <ProtectedRoute exact path="/create-pin"> 
              <CreatePin/>
            </ProtectedRoute>

            <ProtectedRoute exact path="/create-board">
              <CreateBoard/>
            </ProtectedRoute>

            <Route exact path="/pins/tags/:sessionStorage">
              <TagResults/>
            </Route>

            <Route exact path="/users">
              <UserProfileDisplay/>
            </Route>
          </Switch>
        
        </div>
      </AuthProvider>
  );
}

export default App;









