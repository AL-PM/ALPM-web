import React from "react";
import {useNavigate} from "react-router-dom";
import './MainMenuBar.css';

function MainMenuBar({page}){
    const navigate = useNavigate();
    console.log(page)
    return(
        <div id="MainMenubar">
            <span id="MainMenuBarLogo">A.L.P.M</span>
            <span>|</span>
            <span style={{fontWeight:page ==="Study" ? "bold" : "normal", color:page ==="Study" ? "#5C4EFF" : "Black"}} onClick={()=>navigate('/')} >STUDY HOME</span>
            <span>|</span>
            <span style={{fontWeight:page ==="Code" ? "bold" : "normal", color:page ==="Code" ? "#FF6B00" : "Black"}} onClick={()=>navigate('/code')} >CODE COMMUNITY</span>
            <span>|</span>
            <span style={{fontWeight:page ==="CodeGroup" ? "bold" : "normal", color:page ==="CodeGroup" ? "#009418" : "Black"}} onClick={()=>navigate('/codegroup')}>CODE GROUP COMMUNITY</span>
            <span>|</span>
            <span style={{fontWeight:page ==="MyPage" ? "bold" : "normal", color:page ==="MyPage" ? "#EF4949" : "Black"}} onClick={()=>navigate('/mypage')}>MY PAGE</span>
        </div>
    )
}

export default MainMenuBar; 