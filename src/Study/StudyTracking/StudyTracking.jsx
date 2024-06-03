import React, { useState, useEffect } from "react";
import './StudyTracking.css';

function StudyTracking({ problemCode }) {
    
    function preprocessCode(problemCode) {
        let lines = problemCode.content.split("\n");
        let processedCode = [];
        const isPython = problemCode.language === "PYTHON";

        // Remove leading and trailing ``` tags if present
        if (lines[0].startsWith("```")) {
            lines.shift();
        }
        if (lines[lines.length - 1].startsWith("```")) {
            lines.pop();
        }

        function extractExplain(line) {
            let parts = isPython ? line.split("#") : line.split("//");
            return parts.length > 1 ? parts[1].trim() : "";
        }

        function extractCode(line) {
            let codeWithoutComment = isPython ? line.split("#")[0] : line.split("//")[0];
            let trimmedCode = codeWithoutComment.replace(/\s+$/, ''); // Remove trailing whitespace
            return trimmedCode;
        }

        for (let i = 0; i < lines.length; i++) {
            const codePart = extractCode(lines[i]);
            if (codePart !== "") {
                processedCode.push({
                    data: codePart,
                    explain: extractExplain(lines[i]),
                    num: i + 1, // Line number starts from 1
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

    const [inputData, setInputData] = useState({});
    const [currentExplanation, setCurrentExplanation] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    let processedData = preprocessCode(problemCode);

    function handleInputChange(event, num) {
        setInputData({
            ...inputData,
            [num]: event.target.value
        });

        const explanation = processedData[num - 1]?.explain || "";
        setCurrentExplanation(explanation);
    }

    function handleKeyPress(event, num, defaultEvent) {
        if (event.keyCode === 9 && !defaultEvent) {
            event.preventDefault();
            setInputData({
                ...inputData,
                [num]: (inputData[num] || "") + "\t"
            });
        } else if (event.keyCode === 13) {
            event.preventDefault();
            const nextTextarea = document.querySelector(`#textarea-line-${num + 1}`);
            if (nextTextarea) {
                nextTextarea.focus();
            }
        }
    }

    useEffect(() => {
        const allMatch = processedData.every(codeData => codeData.data === (inputData[codeData.num] || setTabFunt(codeData.tabCount)));
        setIsCompleted(allMatch);
    }, [inputData, processedData]);

    return (
        <div id="StudyTracking">
            {processedData.map((codeData) =>
                <div key={codeData.num}>
                    {codeData.data === inputData[codeData.num] ? null :
                        <textarea readOnly id="StudyTrackingBackground" style={{ color: "gray" }}
                            rows={1}
                            cols={130}
                            defaultValue={codeData.data}
                            tabIndex={-1}
                        />}

                    <textarea id={`textarea-line-${codeData.num}`} style={{ color: codeData.data === inputData[codeData.num] ? "blue" : "red" }}
                        rows={1}
                        cols={130}
                        value={inputData[codeData.num] || setTabFunt(codeData.tabCount)}
                        onChange={(event) => handleInputChange(event, codeData.num)}
                        onKeyDown={(event) => handleKeyPress(event, codeData.num, codeData.data === inputData[codeData.num])}
                        readOnly={codeData.data === inputData[codeData.num]}
                    />
                </div>
            )}
            {currentExplanation === "" ? null :
                <div id="explainationBox">
                    <p>현재 작성중인 라인에 대한 설명</p>
                    <p style={{ fontWeight: "bold" }}>:</p>
                    <p>{currentExplanation}</p>
                </div>
            }
            <button id="StudyTrackingCompleteBtn" disabled={!isCompleted} onClick={() => alert("따라치기 학습을 종료합니다.")}> 완료 </button>
        </div>
    )
}

export default StudyTracking;
