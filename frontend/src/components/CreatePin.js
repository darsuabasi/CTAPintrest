import React from 'react';
import ImageUpload from './ImageUpload'

const CreatePin = () => {
    return (
        <div>    
            <div> 

            <h4 className='display-4 text-center mb-4'>
            <i className='fab fa-react' /> React File Upload
            </h4>
            
                <ImageUpload/>
                <h1> Save from site </h1> 
            </div>

            <div>
                {/* drop down bar for Boards with save button */}
            </div>


            <div> 
                <h1> Add your title </h1>
                <h1> Tell everyone what your Pin is about</h1>
                <h1> Add a destination link </h1>
            </div>
        </div>
    )
}

export default CreatePin;