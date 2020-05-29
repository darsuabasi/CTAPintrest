import React, { useState, useRef, useEffect } from 'react';
// import Settings from './Settings'
// import ImageUpload from './ImageUpload';
// import { NavLink } from 'react-router-dom';

const CreatePinModal = () => {

    const outsideModal = useRef();
    const [openModal, setOpenModal] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if(outsideModal.current.contains(e.target)) {
            return 
        }
        setOpenModal(false)
    }

    const handleRedirect= async () => {
        setTimeout(function() {
        window.location = "../create-pin";
        },1000) 
    }

    useEffect(() => {
        const grabClick = document.addEventListener('click', handleClick)

        return () => {
            grabClick();
        }
    }, [])
    
    return (
        <div className="create-modal" ref={outsideModal}> 
            <button onClick={() => setOpenModal(!openModal)}> + </button>

            {openModal ? (
                <button className="image-upload-4-pin" onClick={handleRedirect}> + Create Pin </button>
                
            ): null}
        </div>
    )
};

export default CreatePinModal; 