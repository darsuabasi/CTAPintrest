// import React, { useState, useEffect, useRef } from 'react';
// import { useHistory } from 'react-router-dom';
// // import { login } from '../util/firebaseFunctions'
// // import { toast } from 'react-toastify'


// // import Login from './Login'

// import { login } from '../../util/firebaseFunctions'

// const LoginModal = () => {
//     const outsideModal = useRef();
//     const [openModal, setOpenModal] = useState(false);


//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [openLoginModal, setOpenLoginModal] = useState(false);
//     const outsideLoginModal = useRef();


//     const history = useHistory();
//     const [error, setError] = useState(null);






//     const handleClick = (e) => {
//         e.preventDefault();
//         if(outsideModal.current.contains(e.target)) {
//             return 
//         }
//         setOpenModal(false)
//     }


//     const handleLoginSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await login(email, password)
//             history.push("/user-home")
//         } catch (err) {
//             setError(err.message)
//         }
//     }
    
//     const handleLoginClick = (e) => {
//         e.preventDefault();
//         if(outsideLoginModal.current.contains(e.target)) {
//             return 
//         }
//         setOpenLoginModal(false)
//     }




//     useEffect(() => {
//         const grabLoginClick = document.addEventListener('click', handleLoginClick)
//         return () => {
//             grabLoginClick();
//         }

//             // const grabSignupClick = document.addEventListener('click', handleSignupClick)
//             // return () => {
//             //     grabSignupClick();
//             // }
//     }, [])

//     return (

//         <div className="create-modal" ref={outsideModal}> 
//             <button className="publicNavLogin" onClick={() => setOpenLoginModal(!openLoginModal)}> Log in</button>
//                         {openLoginModal ? (
//                           <div className="stylingLoginModaldiv">
//                             <h1> Pintrest logo</h1>
//                             <h1> Welcome to Pintrest</h1>
//                             <form onSubmit={handleLoginSubmit}> 
//                                 <input placeholder="Email" 
//                                 value={email}
//                                 onChange={(e) => setEmail(e.currentTarget.value)}
//                                 />

//                             <input placeholder="Password" 
//                                 value={password}
//                                 autoComplete="on"
//                                 type="password"
//                                 onChange={(e) => setPassword(e.currentTarget.value)}
//                                 /> 

//                             <p> Forgot your password? </p>
//                             <button type="submit"> Log in </button>

//                             <h5> OR </h5>

//                             <button type="submit"> Continue with Facebook </button>
//                             <button type="submit"> Continue with Google </button>

//                             <p> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>

//                             <p> Not on Pintrest yet? Sign up</p>

//                             </form>
//                          </div>
//                             ): null}

//                     </div>
//     )
// };

// export default LoginModal;

















// import React, { useState, useEffect, useRef } from 'react';
// import { useHistory } from 'react-router-dom';
// // import { login } from '../util/firebaseFunctions'
// // import { toast } from 'react-toastify'


// import Login from './Login'

// const LoginModal = () => {
//     const outsideModal = useRef();
//     const [openModal, setOpenModal] = useState(false);

//     const handleClick = (e) => {
//         e.preventDefault();
//         if(outsideModal.current.contains(e.target)) {
//             return 
//         }
//         setOpenModal(false)
//     }
    
    

//     useEffect(() => {
//         const grabClick = document.addEventListener('click', handleClick)

//         return () => {
//             grabClick();
//         }
//     }, [])

//     return (
//         // <div className="basicModal" /*ref={outsideModal}*//> 
//         //     <button className="publicNavLogin" onClick={() => setOpenLoginModal(!openLoginModal)}> Log in</button>
//         //     {openModal ? (
//         //         <button className="image-upload-4-pin" onClick={handleRedirect}> + Create Pin </button>
                
//         //     ): null}
//         // </div>

//         <div className="create-modal" ref={outsideModal}> 
//             <button onClick={() => setOpenModal(!openModal)}> + </button>

//             {openModal ? (
//                 <button className="image-upload-4-pin" > + Create Pin </button>
                
//             ): null}
//         </div>



//     )
// };

// export default LoginModal;









// import React, { useState, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { login } from '../util/firebaseFunctions'

// import ModalContext from '../Context/ModalContext'


// export default props => {
// const LoginModal = () => {

//     // const { setCurrentModal } = useContext(ModalContext)

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const history = useHistory();
//     const [error, setError] = useState(null);

//     // const openModel = () => setCurrentModel({ name: "LoginModal" });

//     const handleLoginSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await login(email, password)
//             history.push("/user-home")
//         } catch (err) {
//             setError(err.message)
//         }
//     }


//     return (
//         <div className="stylingLoginModaldiv">
//                     <span onClick={props.closeModel} className="close">
//                     X
//                     </span>
//                     <h1> Pintrest logo</h1>
//                     <h1> Welcome to Pintrest</h1>
//                     <form onSubmit={handleLoginSubmit}> 
//                         <input placeholder="Email" 
//                             value={email}
//                             onChange={(e) => setEmail(e.currentTarget.value)}
//                             />

//                         <input placeholder="Password" 
//                         value={password}
//                         autoComplete="on"
//                         type="password"
//                         onChange={(e) => setPassword(e.currentTarget.value)}
//                         /> 

//                         <p> Forgot your password? </p>
//                         <button type="submit"> Log in </button>

//                         <h5> OR </h5>

//                         <button type="submit"> Continue with Facebook </button>
//                         <button type="submit"> Continue with Google </button>

//                         <p> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>

//                       <p> Not on Pintrest yet? Sign up</p>

//                   </form>
//               </div>
//         )
//     }
// }


// export default LoginModal;