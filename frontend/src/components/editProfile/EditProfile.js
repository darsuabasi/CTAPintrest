import React, { useState, useEffect, useContext} from 'react'
import axios from "axios";
import './editProfile.css';
import { AuthContext } from '../../providers/AuthProvider';
import { apiURL } from '../../util/apiURL';
import { useInput } from '../../util/useInput';
import wave from '../../assets/wave.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  EditProfile = () => {
    let [user, setUser] = useState([]);
    let [showUpload, setShowUpload] = useState(false);
    const [file, setFile] = useState({preview: "", raw: ""});
    // const [image, SetImagePath] = useState("");

    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const body = useInput("");
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("")
    const [profilepicture, setProfilePicture] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");

    const underConstruction = () => toast("This part of the app is under construction. Coming soon :)");

    // const onUploadImage=async(e)=>{
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('myImage', file.raw);
    //     formData.append("file", file.preview);
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     };

    //     let res= await axios.post("http://localhost:3000/pins/uploads",formData,config)
    //     console.log(res.data)
    //     debugger
    //     if(res.data.status==="success"){
    //         SetImagePath(res.data.payload);
    //         alert("Image is successfully uploaded")
    //         setFile("")
    //     } else {
    //         console.log(`${res.data.status.message}`)
    //     }

    // }

    // const checkMimeType =(e)=>{
    //     let files = e.target.files 
    //     let err = ''
    //    const types = ['image/png', 'image/jpeg', 'image/gif']
    //     for(let x = 0; x < files.length; x++) {
    //          if (types.every(type => files[x].type !== type)) {
    //          err += files[x].type + ' is not a supported format\n';
    //        }
    //      };
    //    if (err !== '') { 
    //         e.target.value = null
    //         alert(err)
    //          return false; 
    //     }
    //    return true;
    //   }

    const onSelectImage = (e) => {
        if (e.target.files.length) {
            setFile({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0]
            });
          }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
            let res = await axios({
                method: "get",
                url: `${API}/api/users/${currentUser.uid}`,
                headers: {
                    AuthToken: token,
                },
            });
            setUserId(res.data.getUser.id);
            setUser(res.data.getUser);
            setUsername(res.data.getUser.username);
            setProfilePicture(res.data.getUser.profilepic);
            setFirstName(res.data.getUser.first_name);
            setLastName(res.data.getUser.last_name);
            setBio(res.data.getUser.bio); 
            } catch (err) {
                console.log(err.message)
            }
        };
        fetchUser();
    // {
    //     const getUserInfo = async(url)=>{
    //         try {
    //             let res= await axios.get(url)
    //             setUser(res.data.payload)
    //         } catch (error) {
    //             setUser([])
    //         }
    //     }
    //     getUserInfo(`http://localhost:3005/users/${sessionStorage.loginedUser}`)

    // }, 
    }, [])

    // const uploadProfileImg=()=>{
    //     setShowUpload(!setShowUpload)
    // }
    // const handleUpdateProfile = async() => {
    //     console.log(image)
    //     let newPin = await axios.patch(`http://localhost:3005/users/${sessionStorage.loginedUser}`,{profilePic:image})
    //     if(newPin.data.status === 'Success'){
    //         setTimeout(function() {
    //             window.location = "../user-home";
    //         }) 
    //     }
    // }

    // const uploadForm=()=> {
    //    return (
    //         <>
    //             <form onSubmit={onUploadImage}>
    //                 <input type='file' name='myImage' onChange={onSelectImage} />
    //                 <button type='submit'>Edit profile</button>
    //             </form>
    //             <button onClick={handleUpdateProfile}>Done</button>
    //         </>
    //     )
    // }

    const updateUserInfo = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("myImage", file.raw);
            // formData.append("file", file.preview);
            formData.append("username", username.value);
            formData.append("first_name", firstName.value);
            formData.append("last_name", lastName.value);
            formData.append("bio", bio.value);
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
            try {
                let res = await axios({
                    method: "patch",
                    url: `${API}/api/users/${currentUser.uid}`,
                    headers: {
                        AuthToken: token,
                    },
                });
                // formData.append("id", res.user.uid);
                // await axios.patch(`${API}/api/users`, formData, config)
                setUserId(res.data.getUser.id);
                setUser(res.data.getUser);
                setUsername(res.data.getUser.username);
                setProfilePicture(res.data.getUser.profilepic);
                setFirstName(res.data.getUser.first_name);
                setLastName(res.data.getUser.last_name);
                setBio(res.data.getUser.bio); 
                } catch (err) {
                    console.log(err)
                }
        } catch (err) {
            console.log(err)
        }
};
  
    const displayEditProfile = () => {
        return (
        <div className="logged-in-user">
            <p class="centerOfForm" className="editProfileHeader"> Edit profile </p>
            <p class="centerOfForm" className="editProfilePara"> People on Pinterest will get to know you with the info below </p>

            {/* <input className="image-preview-view" type="file" name="myImage" accept="image/png/jpeg" onChange={onSelectImage} placeholder=" Upload it."/>
            <img src={user.profilepic} alt="User Profile"></img> */}



            <form onSubmit={updateUserInfo}>
                <div className="profilePicChangeDiv">
                    <div className="profilePicDiv" id="imagePreview">

                        {/* <div className="style-profile-pic"> 
                            <img className="profile-pic-preview" src={API+profilepicture} />
                        </div> */}
                        <label for="file-upload" class="custom-file-upload-editP" style={{textAlign:"center", marginBottom:"10%", fontVariant:"small-caps", fontWeight:"800", fontSize:"20px"}}>
                            Click to Upload
                        </label>
                        <input className="image-preview-view" type="file" id="file-upload" name="myImage" accept="image/png/jpeg" size="20" onChange={onSelectImage} placeholder="Upload it."/>
                        <img alt="Image Preview" className="profile-pic-preview-editP" src={file.preview}/>
                    </div>
                            
                    <br></br>
                    {/* <button className="profilePicUpdate-btn" onClick={()=>uploadProfileImg()}>Change</button>
                    <div class="sun2"></div> */}
                    <br></br>
                </div>

                <div className="infoBodyDiv">

                    <div className="nameDiv01">
                        <label className="nameLabel" class="epLabel one"> First Name <input className="nameInput input-style-editP" type="text" placeholder={user.first_name}/> </label>
                        <label className="nameLabel" class="epLabel one"> Last Name <input className="nameInput input-style-editP" type="text" placeholder={user.last_name}/> </label>
                    </div>

                    <label class="epLabel"> Username</label>
                    <h5> www.lifetrest.com/<input type="text" className="input-style-editP" placeholder={user.username}/> </h5>

                    <label class="epLabel"> Bio</label>
                    <textarea type="text" className="input-style-editP" style={{height:"250px"}} placeholder={user.bio}/>

                    <label class="epLabel"> Location</label>
                    <input className="input-style-editP" type="text" placeholder="Ex. I dey dey, no wahala"/>

                    <br></br>
                    <button className="profilePicUpdate-btn" onClick={underConstruction}>Update</button>
                    {/* <button className="profilePicUpdate-btn" type="submit">Update</button> */}
                    <div class="sun2"></div>
                    <br></br>
                </div>
            </form>

        {/* {showUpload?(uploadForm()):null} */}
        {/* <ToastContainer/> */}
        {/* <img className="waveImg" src={wave}/> */}
        </div> 
    )}
        return (
            <div>
                {displayEditProfile()}
            </div>
        )
    }

export default EditProfile;