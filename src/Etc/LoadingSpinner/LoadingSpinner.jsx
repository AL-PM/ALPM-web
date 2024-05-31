import React from "react";
import SpinnerIMG from './img/LoadingSpinner1.gif'

function LoadingSpinner(){
    return(
        <div>
            <img src={SpinnerIMG} alt="로딩 이미지"></img>
        </div>
    )
}

export default LoadingSpinner;