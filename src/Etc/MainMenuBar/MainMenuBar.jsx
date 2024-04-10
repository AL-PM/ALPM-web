import React from "react";
import './MainMenuBar.css';

function MainMenuBar({page}){
    console.log(page)
    return(
        <div id="MainMenubar">
            <span id="MainMenuBarLogo">A.L.P.M</span>
            <span>|</span>
            <span style={{fontWeight:page ==="Study" ? "bold" : "normal", color:page ==="Study" ? "#5C4EFF" : "Black"}} onClick={()=>console.log('/')} >STUDY HOME</span>
            <span>|</span>
            <span style={{fontWeight:page ==="Code" ? "bold" : "normal", color:page ==="Code" ? "#FF6B00" : "Black"}} onClick={()=>console.log('/code')} >CODE COMMUNITY</span>
            <span>|</span>
            <span style={{fontWeight:page ==="CodeGroup" ? "bold" : "normal", color:page ==="CodeGroup" ? "#009418" : "Black"}} onClick={()=>console.log('/codegroup')}>CODE GROUP COMMUNITY</span>
            <span>|</span>
            <span style={{fontWeight:page ==="MyPage" ? "bold" : "normal", color:page ==="MyPage" ? "#EF4949" : "Black"}} onClick={()=>console.log('/mypage')}>MY PAGE</span>
        </div>
    )
}

export default MainMenuBar; 