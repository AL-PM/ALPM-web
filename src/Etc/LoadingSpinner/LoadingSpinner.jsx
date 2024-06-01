import React from "react";
import SpinnerIMG from './img/LoadingSpinner1.gif';

function LoadingSpinner() {
    const spinnerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    return (
        <div style={spinnerStyle}>
            <img src={SpinnerIMG} alt="로딩 이미지" />
        </div>
    );
}

export default LoadingSpinner;
