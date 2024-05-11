import React from "react";
import './StudySettingBar.css';
import ProblemSettingIcon from "./img/SearchIcon.png";

function StudySettingBar({setlanguage, setmethod, setlevel, setcodegroup, setproblem, codegrouplist}){
    return(
        <div id="StudySettingBar">
            <span id = "SettingBarSetting" >학습 언어</span>
            <span>|</span>
            <select id="CodeGroupSetting" onChange={(event)=>setlanguage(event.target.value)}>
                <option id="CodeGroupSettingList" value={"Python"} >Python</option>
                <option id="CodeGroupSettingList" value={"Java"} >Java</option>
                <option id="CodeGroupSettingList" value={"C++"} >C++</option>
            </select>
            <span></span>
            <span id = "SettingBarSetting" >학습 방법</span>
            <span>|</span>
            <select id="CodeGroupSetting" onChange={(event)=>setmethod(event.target.value)}>
                <option id="CodeGroupSettingList" value={"따라치기"} >따라치기</option>
                <option id="CodeGroupSettingList" value={"줄별 순서맞추기"} >줄별 순서맞추기</option>
                <option id="CodeGroupSettingList" value={"블록 순서맞추기"} >블록 순서맞추기</option>
                <option id="CodeGroupSettingList" value={"빈칸 채우기"} >빈칸 채우기</option>
            </select>
            <span></span>
            <span id = "SettingBarSetting" >난이도</span>
            <span>|</span>
            <select name="CodeGroupSetting" id="CodeGroupSetting" onChange={(event)=>setlevel(event.target.value)}>
                <option id="CodeGroupSettingList" value={"1"} >1 레벨</option>
                <option id="CodeGroupSettingList" value={"2"} >2 레벨</option>
                <option id="CodeGroupSettingList" value={"3"} >3 레벨</option>
                <option id="CodeGroupSettingList" value={"4"} >4 레벨</option>
                <option id="CodeGroupSettingList" value={"5"} >5 레벨</option>
            </select>
            <span></span>
            <span id = "SettingBarSetting" >코드그룹</span>
            <span>|</span>
            <select name="CodeGroupSetting" id="CodeGroupSetting" onChange={(event)=>setcodegroup(event.target.value)}>
                {codegrouplist.map((codegrouptag)=>
                <option id="CodeGroupSettingList" key={codegrouptag.id} value={codegrouptag.id}> {codegrouptag.name} / {codegrouptag.language} </option>
                )}
            </select>
            
            <img id = "ProblemSettingIcon" onClick={()=>setproblem(true)} src={ProblemSettingIcon} alt="ProblemSettingIcon"></img>
        </div>
    )
}

export default StudySettingBar;