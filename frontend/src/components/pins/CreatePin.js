import React, { useState, /*useEffect*/ } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
// import Home from '../home/Home'

import './CreatePin.css'


// import '../css/ImageUpload.css';

import { useDropzone } from 'react-dropzone'

import { /*ToastContainer, */ toast } from "react-toastify";
import { useInput } from '../../util/useInput'

const CreatePin = () => {

    // for image preview usig dropzone 
  // keeping track of the image aka files
  const [files, setFiles] = useState([]);
    

    const [file, setFile] = useState('');
    const [imagePath, setImagePath] = useState('');

    let noteObj = useInput('');
    let tagObj = useInput('');



    const [optionValue, /*setOptionValue*/] = useState([]);
    const [/*boards,*/ setBoards] = useState([]);
    const [finPin, /*setFinPin*/] = useState([]);


    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        },
      })
    
      const images = files.map((file) => (
        <div key={file.name}>
          <div>
            <img src={file.preview} style={{ width: "300px"}} alt="preview" />
          </div>
        </div>
      ))




    const onImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let res = await axios.post("http://localhost:3000/api/pins/uploads",formData,config)
        console.log(res.data)
        // debugger
        if(res.data.status === "Success"){
            setImagePath(res.data.payload);
            toast("Yaaaah image is successfully uploaded")
            setFile("")
        } else {
            alert(`${res.status.message}`)
        }

    }




    const checkMimeType =(e)=>{
        let files = e.target.files 
        let err = ''
       const types = ['image/png', 'image/jpeg', 'image/gif']
        for(let x = 0; x<files.length; x++) {
             if (types.every(type => files[x].type !== type)) {
             err += files[x].type+' is not a supported format\n';
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
    

    const handleNewPin = async () => {
        let newPin = await axios.post(`/api/pins/`,{creator_id:sessionStorage.loginedUser, imageURL:imagePath, content:noteObj.value})
        console.log(newPin.data)
        handleNewTag(newPin.data.payload)
        toast(`Saved to @boardName`)
        setTimeout(function() {
        window.location = "../user-home";
        },1000) 
    }

    const handleNewTag = async (data)=>{
        if(tagObj.value){
            let newTag = await axios.post(`/api/hashtags/`,{creator_id:data.creator_id, post_id:data.id, tag_name:tagObj.value})
            console.log(newTag.data)
        } else {
            console.log("No tag was added")
        }
    }

    // const handleNewBoard = async () => {
    //     let newPin = await axios.post(`/api/boards/`,{creator_id:sessionStorage.loginedUser, imageURL:imagePath, content:noteObj.value})
    //     console.log(newPin.data)
    //     handleNewTag(newPin.data.payload)
    //     toast(`Saved to @boardName`)

    // }


    // useEffect(() => {
    //     const fetchBoards = async () => {
    //         try {
    //             let res = await axios.get('http://localhost:3002/boards/')
    //             let data = res.data.payload
    //             debugger
    //             setOptionValue(data);
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     fetchBoards();
    // }, [])


    const selectOptions = optionValue.map((e, i) => {
        return <option key={i} value={i}> {e.board_name} </option>
    })

    const handleBoards = (e) => {
        setBoards(e.target.value);
    }


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         let res = await axios.get(`url`)
    //         setFinPin(res.data)
    //     } catch (err) {
    //         console.log(err)
    //         setFinPin([])
    //     }
    // }


    const showPin = finPin.map(finishedPin => {
        return <Link to={`/pin/${finishedPin.finPin.id}`}> <div> <card name={finishedPin.finPin.board_name} className="finished-pin">{finishedPin.finPin.board_name} {finishedPin.finPin.board_description} </card></div> </Link>
    
    })


    // const takeToDisplay = (e) => {
    //     e.preventDefault();
    //     return <Link to={Home}> </Link>
    // }

    
    return (
        <div className="create-pin-div"> 

            <form onSubmit={onImageUpload} className="create-pin-main-div"> 
                <div className="drop-down-div">
                    {/* drop down bar for Boards with save button */}
                    <select className="board-select-options" onChange={handleBoards}>
                            <option defaultValue="Select"> Select </option>
                            {selectOptions}
                    </select>
                    <button className="save-button-style" type="submit" onClick={handleNewPin}> Save </button>

                </div>

                <div className="uploadImageDiv"> 
                    {/* <ImageUpload/> */}

                    {/* <label>
                        Image
                        <input type="file" name="myImage" onChange={onSelectImage} />
                    </label>
                    <button type="submit">Upload</button> */}



                    <div {...getRootProps()} className="image-preview" id="imagePreview"> 
                        <img src="" alt="Preview" className="image-preview__image"/> 
                        <input type="file" name="myImage" onChange={onSelectImage} {...getInputProps()}/>
                        <span className="image-preview__default-text"> Drag and drop or click to upload</span> 
                    </div>
                    {/* <input type="submit" value="Upload!" className="file-upload-button"/> */}
                    <div>{images}</div>
                    

                    <input className="online-pic-link" placeholder="Save from site" />
                </div>



                <div className="main-note-for-pin-div"> 
                    <div className="title-div"> 
                        <input className="add-title-style" type="text" placeholder="Add your title" /> 
                    </div>

                    <div className="user-display">
                        {/* {user} */}
                    </div>

                    <div className="about-div"> 
                        <input className="add-note-style" type="text" placeholder="Tell everyone what your Pin is about" /> 
                    </div>
                </div>


                <div className="link-div">
                    <input className="link-input-style" placeholder="Add a destination link" />  
                </div>
            </form>

            <div>
                <ul className="showing-pin"> 
                    {showPin} 
                </ul>
            </div>
        </div>
    )
}

export default CreatePin;