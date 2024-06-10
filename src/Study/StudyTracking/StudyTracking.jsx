import React, { useState, useEffect } from "react";
import axios from 'axios';
import './StudyTracking.css';

function TrackingBanner({ message, type, onClose }) {
    return (
        <div className={`trackingbanner ${type}`}>
            {message}
            <button onClick={onClose} className={`trackingbanner-close-btn ${type}`}>확인</button>
        </div>
    );
}

function StudyTracking({ problemCode }) {

    const [banner, setBanner] = useState({ show: false, message: '', type: '' });
    const [loading, setLoading] = useState(false);

    function preprocessCode(problemCode) {
        let lines = problemCode.original.split("\n");
        let processedCode = [];
        const isPython = problemCode.language === "PYTHON";

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
            processedCode.push({
                data: extractCode(lines[i]),
                explain: extractExplain(lines[i]),
                num: i + 1,
                tabCount: lines[i].search(/\S|$/)
            });
        }

        processedCode = processedCode.filter(item => item.data !== "");

        processedCode.forEach((item, index) => {
            item.num = index + 1;
        });

        return processedCode;
    }

    function setTabFunt(tabCount) {
        let defaultTab = "";
        for (let j = 0; j < tabCount; j++) {
            defaultTab = defaultTab + "\t";
        }
        return defaultTab;
    }

    function countNumOfWord(line) {
        const tabSize = 8;
        let numOfWords = 0;

        for (let char of line) {
            if (char === '\t') {
                numOfWords += tabSize;
            } else {
                numOfWords += 1;
            }
        }

        return numOfWords;
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

        if (inputData[num] !== event.target.value) {
            const explanation = processedData[num - 1]?.explain || "";
            setCurrentExplanation(explanation);
        }
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

    const completeFn = async (processedData) => {
        let numOfWords = 0;
        processedData.forEach((element) => {
            numOfWords += element.data.length;
        });

        console.log('따라치기 종료!! 따라친 총 글자 수 : ' + numOfWords);
        setLoading(true);

        try {
            const access_token = localStorage.getItem("access_token");

            const response = await axios.post(`https://alpm.duckdns.org:8080/history/create`, {
                "problemType": "TRACE",
                "point": numOfWords,
                "algorithmId": problemCode.id
            }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                console.log(response);
                setBanner({ show: true, message: '정답입니다. 따라친 총 글자 수 : ' + numOfWords, type: 'success' });
            } else {
                setBanner({ show: true, message: '학습 완료 중 오류가 발생했습니다.', type: 'error' });
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setBanner({ show: true, message: '학습 완료 중 오류가 발생했습니다', type: 'error' });
            setLoading(false);
        }
    };

    const closeBanner = () => {
        setBanner({ show: false, message: '', type: '' });
        if (banner.type === 'success') {
            window.location.reload(); // Refresh the page only if the banner type is success
        }
    };

    return (
        <div id="StudyTracking">
            {banner.show && <TrackingBanner message={banner.message} type={banner.type} onClose={closeBanner} />}
            <div id="StudyTrackingGuide">
                <span> 학습 안내 _ 주어진 코드를 따라서 전체 코드를 작성후 완료 버튼을 눌러주세요 </span>
            </div>
            <div id="StudyTrackingTextArea">
                {processedData.map((codeData) =>
                    <div key={codeData.num} id="StudyTrackingLineSpace">
                        {codeData.data === inputData[codeData.num] ? null :
                            <textarea readOnly id="StudyTrackingBackground"
                                rows={1}
                                cols={countNumOfWord(codeData.data)}
                                defaultValue={codeData.data}
                                tabIndex={-1}
                            />}
                        
                        <textarea id={`textarea-line-${codeData.num}`} style={{ color: codeData.data === inputData[codeData.num] ? "blue" : "red"}}
                            rows={1}
                            cols={countNumOfWord(inputData[codeData.num] || setTabFunt(codeData.tabCount))}
                            value={inputData[codeData.num] || setTabFunt(codeData.tabCount)}
                            onChange={(event) => handleInputChange(event, codeData.num)}
                            onKeyDown={(event) => handleKeyPress(event, codeData.num, codeData.data === inputData[codeData.num])}
                            readOnly={codeData.data === inputData[codeData.num]}
                        />
                    </div>
                )}
            </div>
            
            {currentExplanation === "" || isCompleted ? null :
                <div id="explainationBox" disabled={!isCompleted}>
                    <p>현재 작성중인 라인에 대한 설명</p>
                    <p style={{ fontWeight: "bold" }}>:</p>
                    <p>{currentExplanation}</p>
                </div>
            }
    <button id="StudyTrackingCompleteBtn" disabled={!isCompleted || loading} onClick={() => completeFn(processedData)}> 완료 </button>
</div>

    );
}

export default StudyTracking;
