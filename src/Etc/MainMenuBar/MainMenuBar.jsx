import React from "react";
import './MainMenuBar.css';
import { useNavigate } from 'react-router-dom';

function MainMenuBar({ page }) {
    const navigator = useNavigate();
    return (
        <div id="MainMenubar">
            <span id="MainMenuBarLogo">AL-PM</span>
            <span>|</span>
            <button 
                className={`menu-button study ${page === "Study" ? "active-study" : ""}`} 
                onClick={() => navigator('/study')}
            >
                STUDY HOME
            </button>
            <span>|</span>
            <button 
                className={`menu-button code ${page === "Code" ? "active-code" : ""}`} 
                onClick={() => navigator('/code')}
            >
                CODE COMMUNITY
            </button>
            <span>|</span>
            <button 
                className={`menu-button codegroup ${page === "CodeGroup" ? "active-codegroup" : ""}`} 
                onClick={() => navigator('/codegroup')}
            >
                CODE GROUP COMMUNITY
            </button>
            <span>|</span>
            <button 
                className={`menu-button mypage ${page === "MyPage" ? "active-mypage" : ""}`} 
                onClick={() => navigator('/mypage')}
            >
                MY PAGE
            </button>
        </div>
    );
}

export default MainMenuBar;
