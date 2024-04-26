import React from "react";
import './StudySettingBar.css';
import ProblemSettingIcon from "./img/SearchIcon.png";

function StudySettingBar({language, setlanguage, method, setmethod, codegroup, setcodegroup, codegrouplist}){
    return(
        <div id="StudySettingBar">
            <span id = "SettingBarSetting" >학습 언어</span>
            <span>|</span>
            <span onClick={()=>setlanguage("PYTHON")} style={{fontWeight:language==="PYTHON" ? "bold" : "normal", color:language==="PYTHON"?"#5C4EFF" : "black"}}>PYTHON</span>
            <span onClick={()=>setlanguage("JAVA")} style={{fontWeight:language==="JAVA" ? "bold" : "normal", color:language==="JAVA"?"#5C4EFF" : "black"}}>JAVA</span>
            <span onClick={()=>setlanguage("C++")} style={{fontWeight:language==="C++" ? "bold" : "normal", color:language==="C++"?"#5C4EFF" : "black"}}>C++</span>
            <span></span>
            <span id = "SettingBarSetting" >학습 방법</span>
            <span>|</span>
            <span onClick={()=>setmethod("따라치기")} style={{fontWeight:method==="따라치기" ? "bold" : "normal", color:method==="따라치기"?"#5C4EFF" : "black"}}>따라치기</span>
            <span onClick={()=>setmethod("블록 순서맞추기")} style={{fontWeight:method==="블록 순서맞추기" ? "bold" : "normal", color:method==="블록 순서맞추기"?"#5C4EFF" : "black"}}>블록 순서맞추기</span>
            <span onClick={()=>setmethod("줄별 순서맞추기")} style={{fontWeight:method==="줄별 순서맞추기" ? "bold" : "normal", color:method==="줄별 순서맞추기"?"#5C4EFF" : "black"}}>줄별 순서맞추기</span>
            <span onClick={()=>setmethod("빈칸 채우기")} style={{fontWeight:method==="빈칸 채우기" ? "bold" : "normal", color:method==="빈칸 채우기"?"#5C4EFF" : "black"}}>빈칸 채우기</span>
            <span></span>
            <span id = "SettingBarSetting" >코드그룹</span>
            <span>|</span>
            <select name="CodeGroupSetting" id="CodeGroupSetting" onChange={(event)=>setcodegroup(event.target.value)}>
                {codegrouplist.map((codegrouptag)=>
                <option id="CodeGroupSettingList" value={codegrouptag.id}> {codegrouptag.name} / {codegrouptag.language} </option>
                )}
            </select>
            <img id = "ProblemSettingIcon" onClick={console.log({language, method, codegroup})} src={ProblemSettingIcon} alt="ProblemSettingIcon"></img>
        </div>
    )
}

export default StudySettingBar;