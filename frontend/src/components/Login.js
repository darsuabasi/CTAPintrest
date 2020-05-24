import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory();
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // log in with firebase and then change route
            history.push("/")
        } catch (err) {
            setError(err.message)
        }
    }

    return(
        <div> 
            <h1> Pintrest logo</h1>
            <h2> Welcome to Pintrest </h2>
    
            {error ? <div> {error} </div> : null}

            <form onSubmit={handleSubmit}> 
                <input placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />

                <input placeholder="Password" 
                    value={password}
                    autoComplete="on"
                    type="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                /> 

                <p> Forgot your password? </p>
                <button type="submit"> Log in </button>

                <h5> OR </h5>

                <button type="submit"> Continue with Facebook </button>
                <button type="submit"> Continue with Google </button>

                <p> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>

                <p> Not on Pintrest yet? Sign up</p>




            </form>
        </div>
    )
}

export default Login;