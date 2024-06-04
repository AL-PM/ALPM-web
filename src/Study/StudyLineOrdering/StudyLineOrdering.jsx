import React, { useState, useEffect, useCallback } from "react";
import './StudyLineOrdering.css';

function StudyLineOrdering({ problemCode }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [userInput, setUserInput] = useState([]);
    const [randomFinalCode, setRandomFinalCode] = useState([]);
    const [initialRandomFinalCode, setInitialRandomFinalCode] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [finalCode, setFinalCode] = useState([]);

    const code = {
        text: problemCode.original,
        language: problemCode.language
    };

    function preprocessCode(code) {
        let lines = code.split("\n");
        let processedCode = [];
        let currentSection = 0;
        let inSection = false;

        lines.forEach((line, index) => {
            let trimmedLine = line.trim();
            if (trimmedLine !== "") {
                let tabCount = line.search(/\S|$/); // count leading tabs

                if (tabCount === 0) {
                    currentSection = 0;
                    inSection = false;
                } else if (tabCount > 0 && !inSection) {
                    currentSection += 1;
                    inSection = true;
                }

                processedCode.push({
                    data: trimmedLine,
                    num: index,
                    codeSection: currentSection,
                });
            }
        });

        return processedCode;
    }

    function devideFn(processedCode) {
        let finalCode = [];
        let tmpCode = [];
        let nowCodeSection = 1;

        processedCode.forEach((element, index) => {
            if (element.codeSection === nowCodeSection) {
                tmpCode.push(element);
            } else if (element.codeSection > nowCodeSection) {
                finalCode.push(tmpCode);
                tmpCode = [];
                nowCodeSection = element.codeSection;
                tmpCode.push(element);
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
            updatedRandomFinalCode[currentPage] = prevRandomFinalCode[currentPage].filter(block => block.num !== eachBlock.num);
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
                            {codeData.codeSection === 0 ? (
                                <textarea
                                    readOnly
                                    id="StudyLineOrderingCodeArea"
                                    rows={1}
                                    cols={130}
                                    value={codeData.data}
                                    tabIndex={-1}
                                />
                            ) : (
                                <textarea
                                    readOnly
                                    id="StudyLineOrderingCodeArea"
                                    rows={1}
                                    cols={130}
                                    value={userInput[codeData.codeSection - 1][codeData.num] ? userInput[codeData.codeSection - 1][codeData.num].data : `[__${codeData.codeSection},${codeData.num + 1}__]`}
                                    tabIndex={-1}
                                />
                            )}
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
                                key={eachBlock.num}
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
