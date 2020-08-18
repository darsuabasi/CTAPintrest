import React, { useState, useEffect } from 'react'
import axios from "axios"

const  EditProfile = () => {
    let [user, setUser] = useState([])
    let [showUpload, setShowUpload] = useState(false)
    const [file, setFile] = useState("")
    const [image,SetImagePath] = useState("")

    const onUploadImage=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('myFile', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let res= await axios.post("http://localhost:3000/pins/uploads",formData,config)
        // console.log(res.data)
        // debugger
        if(res.data.status==="success"){
            SetImagePath(res.data.payload);
            alert("Image is successfully uploaded")
            setFile("")
        } else {
            console.log(`${res.data.status.message}`)
        }

    }

    const checkMimeType =(e)=>{
        let files = e.target.files 
        let err = ''
       const types = ['image/png', 'image/jpeg', 'image/gif']
        for(let x = 0; x < files.length; x++) {
             if (types.every(type => files[x].type !== type)) {
             err += files[x].type + ' is not a supported format\n';
           }
         };
       if (err !== '') { 
            e.target.value = null
            alert(err)
             return false; 
        }
       return true;
      }

    const onSelectImage=(e)=> {
        if(checkMimeType(e)){
            setFile(e.target.files[0]);
        }
    }

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

    const uploadProfileImg=()=>{
        setShowUpload(!setShowUpload)
    }

    const handleUpdateProfile = async() => {
        console.log(image)
        let newPin = await axios.patch(`http://localhost:3005/users/${sessionStorage.loginedUser}`,{profilePic:image})
        if(newPin.data.status === 'Success'){
            setTimeout(function() {
                window.location = "../user-home";
            }) 
        }
    }

    const uploadForm=()=>{
       return (<>
       <form onSubmit={onUploadImage}>
                <input type='file' name='myFile' onChange={onSelectImage} />
                <button type='submit'>Edit profile</button>
                </form>
                <button onClick={handleUpdateProfile}>Done</button>
                </>)
    }
  
    const displayEditProfile = () => {
        return (
        <div className="logged-in-user">
            <p> Edit profile </p>
            <p> People on Pinterest will get to know you with the info below </p>

            {/* <input className="image-preview-view" type="file" name="myImage" accept="image/png/jpeg" onChange={onSelectImage} placeholder=" Upload it."/>
            <img src={user.profilepic} alt="User Profile"></img> */}


            <input placeholder="Change photo" className="image-preview-view" type="file" name="myImage" accept="image/png/jpeg" onChange={onSelectImage}/>
            <img src="" alt="Image Preview" className="profile-pic-preview-signup" src={file.preview}/>
                     
            <br></br>
            <button onClick={()=>uploadProfileImg()}>Change</button>
            <br></br>

            <form>
                <label> First name</label>
                <input type="text" placeholder={user.first_name}/>

                <label> Last name</label>
                <input type="text" placeholder={user.last_name}/>

                <label> Username</label>
                <input type="text" placeholder={user.username}/>
                <h5> www.pintrest.com/{user.username}</h5>

                <label> About your profile</label>
                <input type="text" placeholder={user.bio}/>

                <label> Locattion</label>
                <input type="text" placeholder="Ex. Under these bitches skin...ahhaha"/>
            </form>

        {showUpload?(uploadForm()):null}
        {/* <ToastContainer/> */}

        </div> 
    )}
        return (
            <div>
                {displayEditProfile()}
            </div>
        )
    }

export default EditProfile;