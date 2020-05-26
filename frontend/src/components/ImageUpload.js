import React, {useState} from 'react';
import axios from 'axios';
import Message from './Message'


const ImageUpload = () => {


    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('');
    const [uploadFile, setUploadFile] = useState({});
    const [errorM, setErrorM] = useState('')

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        try {
            let res = await axios.post('/pins/upload-image', formData, config
                // headers: {
                //     'content-type': 'multipart/form-data'
                // }
            );
            debugger
            const { fileName, filePath } = res.data;
            setUploadFile({ fileName, filePath})
            
            setErrorM('File was uploaded')
        } catch(err) {
            if (err.response.status === 500) {
                setErrorM('There was a problem with the server');
              } else {
                setErrorM(err.response.data.message);
              }

        }
    }
 
    return (
        <> 
            {errorM ? <Message msg={errorM} /> : null}
            <form onSubmit={onSubmit}> 
                {/* <div className="custom-file-div">  */}
                    {/* <input  */}
                        {/* type="file"  */}
                        {/* className="cutom-file-input"  */}
                        {/* id="custom-file"  */}
                        {/* // value="Drag and drop or click to upload" */}
                        {/* onChange={onChange} */}
                    {/* /> */}
                    {/* <label className="file-label" htmlFor="custom-file">  */}
                        {/* {filename} */}
                    {/* </label>  */}
                    {/* <input type="submit" value="Upload" className="file-upload-button"/> */}
                {/* </div>  */}



                <div className="custom-file-div">
                <input 
                    type="file" 
                    className="custom-file-input" 
                    id="customFile"
                    onChange={onChange}
                    />
                <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                <input type="submit" value="Upload that pic 😉" className="file-upload-button"/>
                </div>


 


            </form>


            { uploadFile ? (
                
                <div> 
                    <div>
                        <h3> { uploadFile.fileName } </h3>
                        <img src={uploadFile.filePath} alt=""/> 
                    </div>
                </div> 
            ) : null}
        </>
    )

}

export default ImageUpload;
