import React, { useState, useEffect }from 'react';
import axios from "axios";

const AccountSettings = () => {
    let [user, setUser] = useState([]);


    useEffect(() => {
        const getUserInfo = async(url)=>{
            try {
                let res= await axios.get(url)
                setUser(res.data.payload)
            } catch (error) {
                setUser([])
            }
        }
        getUserInfo(`http://localhost:3005/users/${sessionStorage.loginedUser}`)

    }, [])

    const displayAccountSettings = () => {
        return(
            <div className="account-settings-for-loggged-in-user">
                <div className="intro-account-labels"> 
                    <h1> Account settings</h1>
                    <p> Set your login preferences, help us personalize your experience and make big account changes here</p>
                        <div> 
                            <button> Cancel </button>
                            <button> Done </button>
                        </div>
                </div>

                <div className="account-buttons">
                    <h4> Basic information </h4>
                    <h6> Email Address </h6>
                    <input type="text" placeholder={user.email}/>
                </div>

                <div>
                    <button> Change your password</button>
                </div>

                <div> 
                    <label> Country / Region </label>
                    {/* <select onChange={handleCountries}> 
                        <options selected disabled> Select a country or region </options>
                            {selectCountryOptions}
                        </select> */}
                        <br/>
                    <label> Language </label>
                        {/* <select onChange={handleLanguages}> 
                        <options selected disabled> Select a language </options>
                            {selectLanguageOptions}
                        </select> */}
                </div>

                <div> 
                        <form>
                            <p>Gender</p>
                            <input type="radio" id="male" name="gender" value="male"/>
                            <label for="male">Male</label>
                            <br/>
                            <input type="radio" id="female" name="gender" value="female"/>
                            <label for="female">Female</label>
                            <br/>
                            <input type="radio" id="non-binary" name="gender" value="non-binary"/>
                            <label for="non-binary">Other</label>
                        </form>
                </div>

                <div>
                    <h5> Login options </h5>
                    <p> Use your Facebook or Google account to log in to Pinterest. Learn more</p>
                    
                        <div>
                            <form>  
                                <h6> Facebook</h6>
                                <input type="radio" id="facebook" name="login-options" value="facebook"/>
                                <label for="facebook">Use your Facebook account to log in</label>
                                <br/>
                                <h6> Google</h6>
                                <input type="radio" id="google" name="login-options" value="google"/>
                                <label for="google">Use your Google account to log in</label>
                            </form>
                        </div>
                </div>

                <div>
                    <p> Account changes </p>
                    
                    <h3> Convert to a business account. You'll keep your boards and Pins, and switch to a business-only account.</h3>
                    <button> Convert account</button>
                    <br/>
                    <h3> Hide your Pins and profile </h3>
                    <button> Deactivate account</button>
                    <br/>
                    <h3> Delete your account and account data </h3>
                    <button> Close account</button>
                </div>


            </div>
        )

    }
    return (
        <div>
            {displayAccountSettings()}

        </div>
    )


}

export default AccountSettings; 