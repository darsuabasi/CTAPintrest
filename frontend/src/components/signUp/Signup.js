import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { apiURL } from '../../util/apiURL';
import { signUp } from '../../util/firebaseFunctions';
import { NavLink } from 'react-router-dom'
import { useInput } from '../../util/useInput';
import '../../css/Signup.css'

const Signup = () => {

    // const first


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const API = apiURL();
    const userName = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const bio = useInput("");
    // const profilePic = useInput("");
    const [file, setFile] = useState({preview: "", raw: ""});
    // const age = useInput("");

    // const [age, setAge] = useState("");

    const [user, setUser] = useState([]);


    const onSelectImage = (e) => {
        if (e.target.files.length) {
            setFile({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0]
            });
          }
    }


    const handleNewUser = async (e) => {
        debugger
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("myImage", file.raw);
            formData.append("file", file.preview);
            formData.append("email", email);
            formData.append("username", userName.value);
            formData.append("first_name", firstName.value);
            formData.append("last_name", lastName.value);
            formData.append("bio", bio.value);
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
            try {
                let res = await signUp(email, password);
                formData.append("id", res.user.uid);
            await axios.post(`${API}/api/users`, formData, config)
            } catch (err) {
                console.log(err)
            }
        } catch (err) {
            console.log(err)
        }
};

    return (
        <div className="main-signup"> 
            {/* <header className="pintrestWelcome"> Welcome to Pintrest </header> */}
            {/* <h3> Find new ideas to try</h3> */}

            <div class="progress-bar"> 
                <div class="step"> 
                <p className="cat-greet">Greetings</p>
                <div class="bullet"> 
                <span> 1 </span>
                </div>
                <div class="check fas fa-check"> </div>
                </div>

                <div class="step"> 
                <p className="cat-you">You</p>
                <div class="bullet2"> 
                <span> 2 </span>
                </div>
                <div class="check fas fa-check"> </div>
                </div>

                <div class="step"> 
                <p className="cat-sub">Submit</p>
                <div class="bullet3"> 
                <span> 3 </span>
                </div>
                <div class="check fas fa-check"> </div>
                </div>
            </div>


            <div className="form-outer"> 


            
                            
            {/* {error ? <div> {error} </div> : null} */}
            <form action="#" onSubmit={handleNewUser}> 
            
        <div class="page slidepage"> 
            <div class="title"> Basics </div>
                <div class="field"> 
                    <div class="label"> Create a username </div> 
                    <input {...userName} placeholder="Username"/>
                </div>

                <div class="field"> 
                    <div class="label"> Enter your email </div> 
                    <input placeholder="Email" 
                    text="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>

                <div class="field"> 
                    <div class="label"> Enter a password </div> 
                    <input placeholder="Password" 
                    text="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    autoComplete="on"
                    type="password"
                    /> 
                </div>

                {/* <div class="field btns">
                    <button class="next-btn next"> Next </button>
                </div> */}
            
            </div>

            <div class="page"> 
            <div class="title"> Category </div>


                <div class="field"> 
                    <div class="label"> Your face? </div> 
                    <input className="image-preview-view" type="file" name="myImage" accept="image/png/jpeg" onChange={onSelectImage} placeholder=" Upload it."/>
                    <img src="" alt="Image Preview" className="profile-pic-preview-signup" src={file.preview}/>
                                
                </div>

                <div className="signup-button">
                    <button className="comeSignup" type="submit"> Sign up </button>
                </div>

                <h5 class="orSeparate"> OR </h5>

                {/* <button className="comeSignupGoogle" disabled> Continue with Google </button> */}
                <div className="extraStuff"> 
                <p> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>
                <NavLink className="login" exact to={"/login"}> Already a member? Log in</NavLink>
            
                {/* <p> Create a business account</p>  */}
                </div>

                {/* <div class="field btns">
                    <button class="prev-btn prev"> Previous </button>

                </div> */}

                {/* <div class="field btns">
                    <button class="next-btn next"> Next </button>

                </div> */}
            </div>




            <div class="page"> 
            <div class="title"> Who are you? </div>

                <div class="field"> 
                    <div class="label"> First Name </div> 
                    <input {...firstName} placeholder="First Name"/>
                </div>

                <div class="field"> 
                    <div class="label"> Last Name </div> 
                    <input {...lastName} placeholder="Last Name"/>
                </div>

                <div class="field"> 
                    <div class="label"> Bio </div> 
                    <input {...bio} placeholder="Bio bc who ru?"/>
                </div>

                
                {/* <div class="field btns">
                    <button class="prev-btn prev"> Previous </button>
                </div> */}

                
                </div>




                {/* <label> Email </label> */}
                {/* <input placeholder="Email" 
                    text="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    // {...emailSignup}
                    /> */}
                {/* <label> Password </label> */}
                {/* <input placeholder="Password" 
                    text="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    autoComplete="on"
                    type="password"
                    // {...passwordSignup}
                    />  */}
                
                {/* <input {...userName} placeholder="Create username"/> */}
                {/* <input {...firstName} placeholder="First Name"/> */}
                {/* <input {...lastName} placeholder="Last Name"/> */}
                {/* <input {...bio} placeholder="Bio babyyyy"/> */}
                {/* <input {...profilePic} placeholder="Upload your profile picture here"/> */}
                {/* <button type="submit"> Sign up </button>

                <h5> OR </h5> */}
            </form>

                
            {/* <button type="submit"> Continue with Facebook </button>
            <button type="submit"> Continue with Google </button>

            <p> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>

            
            <NavLink className="login" exact to={"/login"}> Already a member? Log in</NavLink>
            </div>
            <p> Create a business account</p> */}

            </div>
        </div>
    )
}

export default Signup;
