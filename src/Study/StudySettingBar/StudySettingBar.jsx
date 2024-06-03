import React from "react";
import './StudySettingBar.css';
import ProblemSettingIcon from "./img/SearchIcon.png";

function StudySettingBar({setLanguage, setMethod, setLevel, setCodeGroup, setProblem, codegrouplist}){

    function setCodeGroupSetting(codeGroupTag){
        setCodeGroup(codeGroupTag.id);
        setLanguage(codeGroupTag.language);
    }

    function StudySettingBarBtnFn(){
        setProblem(true);
    }
    return(
        <div id="StudySettingBar">
            <span id = "SettingBarSetting" >학습 방법</span>
            <span>|</span>
            <select id="CodeGroupSetting" onChange={(event)=>setMethod(event.target.value)}>
                <option id="CodeGroupSettingList" value={"따라치기"} >따라치기</option>
                <option id="CodeGroupSettingList" value={"줄별 순서맞추기"} >줄별 순서맞추기</option>
                <option id="CodeGroupSettingList" value={"블록 순서맞추기"} >블록 순서맞추기</option>
                <option id="CodeGroupSettingList" value={"빈칸 채우기"} >빈칸 채우기</option>
            </select>
            <span></span>
            <span id = "SettingBarSetting" >난이도</span>
            <span>|</span>
            <select name="CodeGroupSetting" id="CodeGroupSetting" onChange={(event)=>setLevel(event.target.value)}>
                <option id="CodeGroupSettingList" value={"1"} >1 레벨</option>
                <option id="CodeGroupSettingList" value={"2"} >2 레벨</option>
                <option id="CodeGroupSettingList" value={"3"} >3 레벨</option>
            </select>
            <span></span>
            <span id = "SettingBarSetting" >코드그룹</span>
            <span>|</span>
            <select name="CodeGroupSetting" id="CodeGroupSetting" onChange={(event)=>setCodeGroupSetting(event.target.value)}>
                {codegrouplist.map((codegrouptag)=>
                <option id="CodeGroupSettingList" key={codegrouptag.id} value={codegrouptag}> {codegrouptag.name} / {codegrouptag.language} </option>
                )}
            </select>
            
            <button id = "ProblemSettingIcon" onClick={()=>StudySettingBarBtnFn(true)} src={ProblemSettingIcon} alt="ProblemSettingIcon">
                <span>문제 출제하기</span>
            </button>
        </div>
    )
}

export default StudySettingBar;