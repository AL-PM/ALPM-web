import React, { useState, useEffect } from "react";
import './StudyTracking.css';

function StudyTracking({problemCode}) {

    function preprocessCode(code) {
        // 코드 줄별로 분리
        let lines = code.split("\n");
    
        // 각 줄을 객체로 변환하여 저장할 배열
        let processedCode = [];
    
        // 각 줄에 대한 설명을 분리하는 함수
        function extractExplain(line) {
            let parts = line.split("//");
            return parts.length > 1 ? parts[1].trim() : "";
        }

        function extractCode(line) {
            let codeWithoutComment = line.split("//")[0]; // 주석 제거
            let trimmedCode = codeWithoutComment.replace(/\s+$/, ''); // 뒤쪽 공백 제거
            return trimmedCode;
        }

        // 코드를 객체로 변환하고 배열에 저장
        for (let i = 0; i < lines.length; i++) {
            if(extractCode(lines[i]) !== ""){
                processedCode.push({
                    data: extractCode(lines[i]),
                    explain: extractExplain(lines[i]),
                    num: i + 1, // 줄 수는 1부터 시작
                    tabCount: lines[i].search(/\S|$/)
                });
            }
        }
        return processedCode;
    }

    function setTabFunt(tabCount) {
        let defaultTab = "";
        for (let j = 0; j < tabCount; j++) {
            defaultTab = defaultTab + "\t";
        }
        return defaultTab;
    }

    // 코드 상태를 관리하기 위해 useState를 사용
    const [inputData, setInputData] = useState({});
    const [currentExplanation, setCurrentExplanation] = useState("");
    const [isCompleted, setIsCompleted] = useState(false); // 완료 상태를 추적하는 상태

    // preprocessCode 함수를 이용하여 코드 전처리
    let processedData = preprocessCode(problemCode.content);

    // 입력된 값을 추적하고 상태에 따라 색상을 변경하는 함수
    function handleInputChange(event, num) {
        setInputData({
            ...inputData,
            [num]: event.target.value
        });

        // 현재 라인의 설명을 업데이트
        const explanation = processedData[num - 1]?.explain || ""; // 설명이 없을 경우 빈 문자열로 설정
        setCurrentExplanation(explanation);
    }

    function handleKeyPress(event, num, defaultEvent) {
        if (event.keyCode === 9 && !defaultEvent) {
            event.preventDefault(); // 기본 동작 방지
            setInputData({
                ...inputData,
                [num]: (inputData[num] || "") + "\t" // 현재 데이터 뒤에 "\t" 추가
            });
        } else if (event.keyCode === 13) {
            event.preventDefault();
            const nextTextarea = document.querySelector(`#textarea-line-${num + 1}`);
            if (nextTextarea) {
                nextTextarea.focus();
            }
        }
    }

    // 모든 입력 필드가 원본 코드와 일치하는지 확인하는 useEffect
    useEffect(() => {
        const allMatch = processedData.every(codeData => codeData.data === (inputData[codeData.num] || setTabFunt(codeData.tabCount)));
        setIsCompleted(allMatch);
    }, [inputData, processedData]);

    return( 
        <div id="StudyTracking">
            {processedData.map((codeData) => 
            <div key={codeData.num}>
                {codeData.data === inputData[codeData.num] ? null : 
                <textarea readOnly id="StudyTrackingBackground" style={{color:"gray"}} 
                rows={1}
                cols={130}
                defaultValue={codeData.data} 
                tabIndex={-1}
                />}

                <textarea id={`textarea-line-${codeData.num}`} style={{color: codeData.data === inputData[codeData.num] ? "blue" : "red"}} 
                rows={1}
                cols={130}
                value={inputData[codeData.num] || setTabFunt(codeData.tabCount)}
                onChange={(event) => handleInputChange(event, codeData.num)}
                onKeyDown={(event) => handleKeyPress(event, codeData.num, codeData.data === inputData[codeData.num])} // 탭 키 입력 처리
                readOnly={codeData.data === inputData[codeData.num]}
                />
                </div>
            )} 
                {currentExplanation === "" ? null : 
                <div id="explainationBox">
                    <p>현재 작성중인 라인에 대한 설명</p>
                    <p style={{fontWeight:"bold"}}>:</p>
                    <p>{currentExplanation}</p> 
                </div>
                }
            <button id="StudyTrackingCompleteBtn" disabled={!isCompleted} onClick={()=> alert("따라치기 학습을 종료합니다.")}> 완료 </button>
        </div>
    )
}

export default StudyTracking;
