import React, { createContext, useState, useEffect } from 'react';
import  { getFirebaseIdToken }  from '../util/firebaseFunctions'
import firebase from '../firebase'

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [currentuser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);


    const updateUser = (user) => {
        if(user) {
            const { email, uid } = user;
            const lastLogin = user.metadata.lastLogin;
            setCurrentUser({email, lastLogin, id: uid});
            getFirebaseIdToken().then(token => {
                setToken(token);
                setLoading(false);
            })
        } else {
            setCurrentUser(null);
            setLoading(false);
        }
    }
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(updateUser)
        return unsubscribe;
    }, [])



    if(loading) return <div> ...Loading </div>
    return(
        <AuthContext.Provider value={{currentuser, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;