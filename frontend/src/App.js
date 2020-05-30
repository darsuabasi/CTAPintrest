import React from 'react';
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar';
// import Landing from './components/Landing';
import Home from './components/home/Home';
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
import AuthProvider from './providers/AuthContext'
import SignupModal from './components/SignupModal'
import LoginModal from './components/LoginModal'
import { AuthRoute, /*ProtectedRoute*/ } from './util/routeUtil'


import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import Pins from './components/Pin'

// import Pin from './components/pins/SinglePin';
// import Pins from './components/pins/AllPins'


import Landing from './components/Landing'
import Settings from './components/Settings';
import EditProfile from './components/EditProfile';
import AccountSettings from './components/AccountSettings';

import { ModalContextProvider } from './Context/ModalContext';
import ModalManager from './components/modal/ModalManager'
import SearchResults from './components/SearchResults'
import UserProfile from './components/UserProfile'

const App = () => {
  return (

    <ModalContextProvider>
    <ModalManager/>


    
    
    <div className="Mocktrist-app">
    <AuthProvider> 
      <Navbar/>

      <Route exact path="/">
          <Landing/> 
        </Route>
     

      <Route exact path="/user-feed">
        <Home/>
      </Route>

      <Route exact path="/following">
        <AllUsersFollowing/>
      </Route>

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
        <SignupModal/> 
      </AuthRoute>

      <AuthRoute path="/login">
        <LoginModal/> 
      </AuthRoute> 

      <Route exact path="/create-pin"> 
        <CreatePin/>
      </Route>

      <Route exact path="/pins/search-results">
        <SearchResults/>
      </Route>

      <Route exact path="/user-profile/boards">
        <UserProfile/>
      </Route>


        {/* <Route exact path="/pin">
          <Pin/>
        </Route> */}

        {/* <Route exact path="/pins">
          <Pins/>
        </Route> */}

        



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



      </AuthProvider>
    </div>
    </ModalContextProvider>
  );
}

export default App;



