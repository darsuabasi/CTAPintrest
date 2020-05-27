import React from 'react';
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar';
// import Landing from './components/Landing';
import Home from './components/Home';
// import Today from './components/Today';
// import Following from './components/Following';
// import SearchBar from './components/SearchBar';
// import Notifications from './components/Notifications';
// import Messages from './components/Messages';
// import UserPage from './components/AllUsers';
// import Accounts from './components/Accounts';
// import Error from './components/Error';

import CreatePin from './components/CreatePin'


import AllUsers from './components/AllUsers'
import AuthProvider from './providers/AuthContext'
import SignupModal from './components/SignupModal'
import LoginModal from './components/LoginModal'
import { AuthRoute, ProtectedRoute } from './util/routeUtil'
import ImageUpload from './components/ImageUpload';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import Pins from './components/Pin'
import Pin from './components/pins/SinglePin';
import Pins from './components/pins/AllPins'

import Landing from './components/Landing'



const App = () => {
  return (
    
    <div>
    <AuthProvider> 
      <Navbar/>
     

      {/* <Route to="/">
        <Landing/>
      </Route> */}

      <ProtectedRoute exact path="/user-home">
        <Home/>
      </ProtectedRoute>

      <Route path="/users">
        <AllUsers/>
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

      <Route path="/pins/upload-image">
        <ImageUpload/>
        </Route>

        <Route exact path="/pin">
          <Pin/>
        </Route>

        <Route exact path="/pins">
          <Pins/>
        </Route>

        <Route path="/">
          <Landing/> 
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



    </AuthProvider>
    </div>
  );
}

export default App;



