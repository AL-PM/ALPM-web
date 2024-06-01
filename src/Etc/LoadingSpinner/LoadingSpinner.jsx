import React from "react";
import { HashLoader } from 'react-spinners';
import './LoadingSpinner.css';

function LoadingSpinner({color, comment}){
    return(
        <div id="Spinner">
            <HashLoader 
                color={color} 
                speedMultiplier={0.8}
            />
            {comment ? <p>{comment}</p> : null}
        </div>
    )
}

export default LoadingSpinner;