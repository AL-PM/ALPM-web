import React from "react";
import { HashLoader} from 'react-spinners';
import './LoadingSpinner.css';

function LoadingSpinner({color, comment}){
    return(
        <div id="Spinner">
            <HashLoader color={color} />
            {comment ? <p>{comment}</p> : null}
        </div>
    )
}

export default LoadingSpinner;