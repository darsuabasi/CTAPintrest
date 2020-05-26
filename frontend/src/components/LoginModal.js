import React, { useState, /*useEffect, useRef*/ } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../util/firebaseFunctions'


const LoginModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState(null);
    const history = useHistory();

    // const outsideModal = useRef();
    // const [openModal, setOpenModal] = useState(false);

    
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password)
            history.push("/")
        } catch (err) {
            console.log("Error", err)
        }
    }

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     if(outsideModal.current.contains(e.target)) {
    //         return 
    //     }
    //     setOpenModal(false)
    // }

    // useEffect(() => {
    //     const grabClick = document.addEventListener('click', handleClick)

    //     return () => {
    //         grabClick();
    //     }
    // }, [])

    return(
        <div className="basicModal" /* ref={outsideModal} */> 
        {/* <button onClick={() => setOpenModal(!openModal)}> Log in</button> */}
        {/* {openModal ? ( */}
            <div>
            <h1> Pintrest logo</h1>
            <h1> Welcome to Pintrest</h1>
            <form onSubmit={handleSubmit}> 
            <input 
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="Email" 
                value={email}
            />

            <input 
                type="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="Password" 
                value={password}
                autoComplete="on"
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
        {/* ): null} */}
    </div>
)
}

export default LoginModal;