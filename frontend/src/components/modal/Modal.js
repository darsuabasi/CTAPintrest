import React, { useState, useRef, useEffect } from 'react';
import LoginModal from '../LoginModal'

const Modal = () => {

    const outsideModal = useRef();
    const [openModal, setOpenModal] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if(outsideModal.current.contains(e.target)) {
            return 
        }
        setOpenModal(false)
    }

    useEffect(() => {
        const grabClick = document.addEventListener('click', handleClick)

        return () => {
            grabClick();
        }
    }, [])
    
    return (
        <div className="basicModal" ref={outsideModal}> 
            <h1> Hello modal</h1>
            <button onClick={() => setOpenModal(!openModal)}> Show Modal</button>
            {openModal ? (
                <p> mOdal is open </p>
            ): null}
        </div>
    )
}

export default Modal; 