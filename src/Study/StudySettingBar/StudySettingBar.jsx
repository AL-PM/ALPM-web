import React, { useState, useEffect, useCallback } from "react";
import './StudySettingBar.css';

function StudySettingBar({ setLanguage, setMethod, setLevel, setCodeGroup, codegrouplist, problem ,method, level, fetchProblemCode, resetProblemCode , problemCode}) {
    const [levelDisabled, setLevelDisabled] = useState(false); // 난이도 선택 창 활성/비활성 상태

    // Filter out code groups with algorithm_count of 0 and add Default/Default group at the beginning
    const filteredCodeGroupList = [{ 
            id: -1, 
            name: "Default", 
            language: "Default", 
            algorithm_count: 1 , 
            owner : {
                id : 0,
                name : "Default",
            }},
        ...codegrouplist.filter(codegrouptag => codegrouptag.algorithm_count !== 0)
    ];

    // useCallback to memoize setCodeGroupSetting function
    const setCodeGroupSetting = useCallback((event) => {
        const codeGroupTag = JSON.parse(event.target.value);
        setCodeGroup(codeGroupTag.id);
        setLanguage(codeGroupTag.language);
    }, [setCodeGroup, setLanguage]);

    useEffect(() => {
        // 학습 방법이 따라치기 또는 줄별 순서맞추기인 경우에만 난이도 선택 창 비활성화
        setLevelDisabled(method === "따라치기" || method === "줄별 순서맞추기");
    }, [method]);

    const StudySettingBarBtnFn = () => {
        fetchProblemCode();
    };

    const StudySettingBarResetFn = () => {
        resetProblemCode();
        setLevel(1); // 난이도 초기화
        setMethod("따라치기");
        setCodeGroup(-1); // Default group
        setLanguage("Default"); // Default language
    };

    return (
        <div id="StudySettingBar">
            <span id="SettingBarSetting">학습 방법</span>
            <span>|</span>
            {problem ? (
                <span>{method}</span>
            ) : (
                <select id="CodeGroupSetting" onChange={(event) => setMethod(event.target.value)} disabled={problem}>
                    <option value="따라치기">따라치기</option>
                    <option value="줄별 순서맞추기">줄별 순서맞추기</option>
                    <option value="블록 순서맞추기">블록 순서맞추기</option>
                    <option value="빈칸 채우기">빈칸 채우기</option>
                </select>
            )}
            <span id="SettingBarSetting">난이도</span>
            <span>|</span>
            {problem ? (
                <span>{level} 레벨</span>
            ) : (
                <select name="LevelSetting" id="CodeGroupSetting" onChange={(event) => setLevel(event.target.value)} disabled={problem || levelDisabled}>
                    <option value="1">1 레벨</option>
                    <option value="2">2 레벨</option>
                    <option value="3">3 레벨</option>
                </select>
            )}
            {problem ?
            <span id="SettingBarSetting">코드 정보</span> :
            <span id="SettingBarSetting">코드 그룹</span>}
            <span>|</span>
            {problem ? (
                <span>{problemCode.name} / {problemCode.language} / {problemCode.owner.id === 1 ? "AL-PM" : problemCode.owner.name}</span>
            ) : (
                <select name="CodeGroupSetting" id="CodeGroupSetting" onChange={setCodeGroupSetting} disabled={problem}>
                    {filteredCodeGroupList.map((codegrouptag) => (
                        <option key={codegrouptag.id} value={JSON.stringify(codegrouptag)}>
                            {codegrouptag.id === -1 ?
                                <span>선택 안됨</span> 
                                : 
                                <span>{codegrouptag.name} / {codegrouptag.language} / {codegrouptag.owner.id === 1 ? "AL-PM" : codegrouptag.owner.name}</span>
                            }                           
                        </option>
                    ))}
                </select>
            )}
            {problem ?
                <button id="ProblemSettingIcon" onClick={StudySettingBarResetFn}>
                    <span>초기화</span>
                </button>
                :
                <button id="ProblemSettingIcon" onClick={StudySettingBarBtnFn}>
                    <span>문제 출제하기</span>
                </button>
            }
        </div>
    )
}

export default StudySettingBar;
