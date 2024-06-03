import React from "react";
import './StudySettingBar.css';
import axios from 'axios';

function StudySettingBar({setLanguage, setMethod, setLevel, setCodeGroup, setProblem, codegrouplist, codegroup ,problem, method, setProblemCode, problemCode}){

    function setCodeGroupSetting(event){
        const codeGroupTag = JSON.parse(event.target.value);
        setCodeGroup(codeGroupTag.id);
        setLanguage(codeGroupTag.language);
    }

    function StudySettingBarBtnFn(){
        setProblem(true);
        const fetchcodeGroupInfo = async () => {
            try {
                const access_token = localStorage.getItem("access_token");

                const response = await axios.get(`https://alpm.duckdns.org:8080/codeGroup/${codegroup}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                setProblemCode(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchcodeGroupInfo();

        console.log(problemCode);
    }

    function StudySettingBarResetFn(){
        setProblem(false);
    }

    const filteredCodeGroupList = method === "줄별 순서맞추기"
        ? codegrouplist.filter(codegrouptag => codegrouptag.language !== "PYTHON")
        : codegrouplist;

    return(
        <div id="StudySettingBar">
            <span id="SettingBarSetting">학습 방법</span>
            <span>|</span>
            <select id="CodeGroupSetting" onChange={(event)=>setMethod(event.target.value)} disabled={problem}>
                <option value="따라치기">따라치기</option>
                <option value="줄별 순서맞추기">줄별 순서맞추기</option>
                <option value="블록 순서맞추기">블록 순서맞추기</option>
                <option value="빈칸 채우기">빈칸 채우기</option>
            </select>
            <span id="SettingBarSetting">난이도</span>
            <span>|</span>
            <select name="LevelSetting" id="CodeGroupSetting" onChange={(event)=>setLevel(event.target.value)} disabled={problem}>
                <option value="1">1 레벨</option>
                <option value="2">2 레벨</option>
                <option value="3">3 레벨</option>
            </select>
            <span id="SettingBarSetting">코드그룹</span>
            <span>|</span>
            <select name="CodeGroupSetting" id="CodeGroupSetting" onChange={setCodeGroupSetting} disabled={problem}>
                {filteredCodeGroupList.map((codegrouptag) =>
                    <option key={codegrouptag.id} value={JSON.stringify(codegrouptag)}>{codegrouptag.name} / {codegrouptag.language}</option>
                )}
            </select>
            { problem ? 
            <button id="ProblemSettingIcon" onClick={StudySettingBarResetFn} >
                <span>초기화</span> 
            </button>
            :
            <button id="ProblemSettingIcon" onClick={StudySettingBarBtnFn} >
                <span>문제 출제하기</span>
            </button>
        }
            
        </div>
    )
}

export default StudySettingBar;
