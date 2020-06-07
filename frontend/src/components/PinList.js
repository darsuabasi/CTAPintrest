import React from 'react'

import '../css/PinList.css'

const PinList = (props) => {
    return (
        <div className="pin-list">
            {props.children}
        </div>
    )

}


export default PinList;