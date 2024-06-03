import React from "react";
import './StudySettingBar.css';

function StudySettingBar({setLanguage, setMethod, setLevel, setCodeGroup, codegrouplist, codegroup, problem, method, fetchProblemCode, resetProblemCode}) {

    const [selectedMethod, setSelectedMethod] = React.useState("");
    const [selectedLevel, setSelectedLevel] = React.useState("");
    const [selectedCodeGroup, setSelectedCodeGroup] = React.useState("");

    function setCodeGroupSetting(event) {
        const codeGroupTag = JSON.parse(event.target.value);
        setCodeGroup(codeGroupTag.id);
        setLanguage(codeGroupTag.language);
        setSelectedCodeGroup(`${codeGroupTag.name} / ${codeGroupTag.language}`);
    }

    const handleMethodChange = (event) => {
        setMethod(event.target.value);
        setSelectedMethod(event.target.options[event.target.selectedIndex].text);
    };

    const handleLevelChange = (event) => {
        setLevel(event.target.value);
        setSelectedLevel(event.target.options[event.target.selectedIndex].text);
    };

    const StudySettingBarBtnFn = () => {
        fetchProblemCode();
    };

    const StudySettingBarResetFn = () => {
        resetProblemCode();
    };

    const filteredCodeGroupList = method === "줄별 순서맞추기"
        ? codegrouplist.filter(codegrouptag => codegrouptag.language !== "PYTHON")
        : codegrouplist;

    return(
        <div id="StudySettingBar">
            <span id="SettingBarSetting">학습 방법</span>
            <span>|</span>
            <select id="CodeGroupSetting" onChange={handleMethodChange} disabled={problem}>
                <option value="따라치기">따라치기</option>
                <option value="줄별 순서맞추기">줄별 순서맞추기</option>
                <option value="블록 순서맞추기">블록 순서맞추기</option>
                <option value="빈칸 채우기">빈칸 채우기</option>
            </select>
            <span id="SettingBarSetting">난이도</span>
            <span>|</span>
            <select name="LevelSetting" id="CodeGroupSetting" onChange={handleLevelChange} disabled={problem}>
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
            {problem ? (
                <button id="ProblemSettingIcon" onClick={StudySettingBarResetFn}>
                    <span>초기화</span>
                </button>
            ) : (
                <button id="ProblemSettingIcon" onClick={StudySettingBarBtnFn}>
                    <span>문제 출제하기</span>
                </button>
            )}
            {problem && (
                <div id="SelectedSettings">
                    <p>선택된 학습 방법: {selectedMethod}</p>
                    <p>선택된 난이도: {selectedLevel}</p>
                    <p>선택된 코드그룹: {selectedCodeGroup}</p>
                </div>
            )}
        </div>
    )
}

export default StudySettingBar;
