import React from "react";
import './MainMenuBar.css';
import { useNavigate } from 'react-router-dom';

function MainMenuBar({ page }) {
    const navigator = useNavigate();
    return (
        <div id="MainMenubar">
            <span id="MainMenuBarLogo">A.L.P.M</span>
            <span>|</span>
            <button 
                className={`menu-button ${page === "Study" ? "active-study" : ""}`} 
                onClick={() => navigator('/study')}
            >
                STUDY HOME
            </button>
            <span>|</span>
            <button 
                className={`menu-button ${page === "Code" ? "active-code" : ""}`} 
                onClick={() => navigator('/code')}
            >
                CODE COMMUNITY
            </button>
            <span>|</span>
            <button 
                className={`menu-button ${page === "CodeGroup" ? "active-codegroup" : ""}`} 
                onClick={() => navigator('/codegroup')}
            >
                CODE GROUP COMMUNITY
            </button>
            <span>|</span>
            <button 
                className={`menu-button ${page === "MyPage" ? "active-mypage" : ""}`} 
                onClick={() => navigator('/mypage')}
            >
                MY PAGE
            </button>
        </div>
    );
}

export default MainMenuBar;
