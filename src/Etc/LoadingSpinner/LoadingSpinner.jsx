import React from "react";
import SpinnerIMG from './img/LoadingSpinner1.gif';
import './LoadingSpinner.css';

function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <img src={SpinnerIMG} alt="로딩 이미지" className="spinner-image" />
        </div>
    );
}

export default LoadingSpinner;
