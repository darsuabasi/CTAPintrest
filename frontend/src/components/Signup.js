import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { apiURL } from '../util/apiURL'

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState([]);
    const [error, setError] = useState(null);
    const history = useHistory();
    const API = apiURL();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // signup with firebase send results to backend
            history.push("/")
        } catch (err) {
            setError(err.message)
        }
    }

    return(
        <div> 
            <h1> Pintrest logo</h1>
            <h2> Welcome to Pintrest </h2>
            <h4> Find new ideas to try</h4>
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

                <input placeholder="Age" 
                    value={age}
                    onChange={(e) => setAge(e.currentTarget.value)}
                />

                <button type="submit"> Continue </button>

                <h5> OR </h5>

                <button type="submit"> Continue with Facebook </button>
                <button type="submit"> Continue with Google </button>

                <p> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>

                <p> Already a member? Log in</p>

                <p> Create a business account</p>




            </form>
        </div>
    )
}

export default Signup;