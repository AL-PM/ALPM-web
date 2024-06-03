import React, { useState, useEffect, useCallback } from "react";
import './StudyLineOrdering.css';

function StudyLineOrdering({problemCode}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [userInput, setUserInput] = useState([]);
    const [randomFinalCode, setRandomFinalCode] = useState([]);
    const [initialRandomFinalCode, setInitialRandomFinalCode] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [finalCode, setFinalCode] = useState([]);

    const code = {
        text : problemCode.original ,
        language : problemCode.language
    };

    function preprocessCode(code) {
        let lines = code.split("\n");
        let processedCode = [];
    
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let trimmedLine = line.trim();
            let indentLevel = line.search(/\S/);

            if (trimmedLine !== "") {
                processedCode.push({
                    data: trimmedLine,
                    indentLevel: indentLevel
                });
            }
        }
    
        return processedCode;
    }
    
    function devideFn(processedCode) {
        let finalCode = [];
        let tmpCode = [];

        processedCode.forEach((element, index) => {
            if (index === 0 || element.indentLevel === processedCode[index - 1].indentLevel) {
                tmpCode.push(element);
            } else {
                finalCode.push(tmpCode);
                tmpCode = [element];
            }

            // Ensure the last section is added
            if (index === processedCode.length - 1) {
                finalCode.push(tmpCode);
            }
        });

        return finalCode;
    }

    const shuffle = useCallback((array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }, []);

    const randomFn = useCallback((finalCode) => {
        // Make a deep copy of the finalCode array
        let randomCode = JSON.parse(JSON.stringify(finalCode));

        // Shuffle each section within the randomCode array
        randomCode.forEach(section => {
            shuffle(section);
        });
        return randomCode;
    }, [shuffle]);

    useEffect(() => {
        let processedData = preprocessCode(code.text);
        setProcessedData(processedData);
        let finalCode = devideFn(processedData);
        let randomfinalCode = randomFn(finalCode);
        setFinalCode(finalCode);
        setUserInput(new Array(randomfinalCode.length).fill([]));
        setRandomFinalCode(randomfinalCode);
        setInitialRandomFinalCode(randomfinalCode); // Save the initial random code
    }, [code.text, randomFn]);

    useEffect(() => {
        // This effect runs whenever userInput is updated to trigger re-render
    }, [userInput]);

    function exampleFn(eachBlock) {
        setUserInput(prevUserInput => {
            const updatedUserInput = [...prevUserInput];
            updatedUserInput[currentPage] = [...prevUserInput[currentPage], eachBlock];
            return updatedUserInput;
        });

        setRandomFinalCode(prevRandomFinalCode => {
            const updatedRandomFinalCode = [...prevRandomFinalCode];
            updatedRandomFinalCode[currentPage] = prevRandomFinalCode[currentPage].filter(block => block.data !== eachBlock.data);
            return updatedRandomFinalCode;
        });
    }

    function resetFn() {
        setUserInput(new Array(initialRandomFinalCode.length).fill([]));
        setRandomFinalCode(initialRandomFinalCode);
        setCurrentPage(0);
    }

    function completeFn() {
        let isCorrect = true;

        for (let i = 0; i < finalCode.length; i++) {
            for (let j = 0; j < finalCode[i].length; j++) {
                if (!userInput[i][j] || userInput[i][j].data !== finalCode[i][j].data) {
                    isCorrect = false;
                    break;
                }
            }
            if (!isCorrect) break;
        }

        if (isCorrect) {
            alert("정답입니다");
        } else {
            alert("틀렸습니다. 정답을 다시 작성해주세요.");
            resetFn();
        }
    }

    return (
        <div>
            <div id="StudyLineOrdering" >
                <div id="StudyLineOrderingTextContainer">
                    {processedData && processedData.map((codeData, index) =>
                        <div key={index} >
                            <textarea
                                readOnly
                                id="StudyLineOrderingCodeArea"
                                rows={1}
                                cols={130}
                                value={codeData.data}
                                tabIndex={-1}
                            />
                        </div>
                    )}
                </div>
                <div id="LineOrderingExampleBox">
                    <p style={{ fontFamily: 'SUITE-Regular' }}>
                        {"[ " + (currentPage + 1) + "번 페이지 보기 ]"}
                    </p>
                    <div id="LineOrderingExampleList">
                        {randomFinalCode[currentPage] && randomFinalCode[currentPage].map((eachBlock) =>
                            <p
                                key={eachBlock.data}
                                id="LineOredringExampleList"
                                onClick={() => exampleFn(eachBlock)}
                            >
                                {eachBlock.data}
                            </p>
                        )}
                    </div>
                    <div>
                        {randomFinalCode.map((_, index) => (
                            <button
                                id="codeSectionPagination"
                                key={index}
                                onClick={() => setCurrentPage(index)}
                            >
                                {"_" + (index + 1)}
                            </button>
                        ))}
                    </div>
                    <div id="BlockOrderingBtnContainer">
                        <button id="BlockOrderingBtn" onClick={resetFn}>초기화</button>
                        <button id="BlockOrderingBtn" onClick={completeFn}>완료</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudyLineOrdering;
