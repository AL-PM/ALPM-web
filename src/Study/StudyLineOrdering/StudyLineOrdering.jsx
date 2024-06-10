import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import './StudyLineOrdering.css';

function TrackingBanner({ message, type, onClose }) {
    return (
        <div className={`trackingbanner ${type}`}>
            {message}
            <button onClick={onClose} className={`trackingbanner-close-btn ${type}`}>확인</button>
        </div>
    );
}


function StudyLineOrdering({ problemCode }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [userInput, setUserInput] = useState([]);
    const [randomFinalCode, setRandomFinalCode] = useState([]);
    const [initialRandomFinalCode, setInitialRandomFinalCode] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [finalCode, setFinalCode] = useState([]);
    const [banner, setBanner] = useState({ show: false, message: '', type: '' });

    const code = {
        text: problemCode.original,
        language: problemCode.language
    };

    function preprocessCode(code, language) {
        let lines = code.split("\n");
        let processedCode = [];
        let currentSection = 0;
        let tmpSection;
        let inSection = false;
        let sectionNum = {}; // to keep track of num within each section
    
        lines.forEach((line, index) => {
            let trimmedLine;
            if (language === 'PYTHON') {
                trimmedLine = line.split("#")[0];
            } else {
                trimmedLine = line.split("//")[0];
            }
            if (trimmedLine.trim() !== "") {
                let tabCount = line.search(/\S|$/); // count leading tabs
    
                if (language === 'JAVA') {
                    if (tabCount < 2) {
                        tmpSection = 0;
                        inSection = false;
                    } else if (tabCount >= 2 && !inSection) {
                        currentSection += 1;
                        tmpSection = currentSection;
                        inSection = true;
                    }
                } else { // for C and Python
                    if (tabCount < 1) {
                        tmpSection = 0;
                        inSection = false;
                    } else if (tabCount >= 1 && !inSection) {
                        currentSection += 1;
                        tmpSection = currentSection;
                        inSection = true;
                    }
                }
    
                // Initialize the section number tracker if it doesn't exist
                if (!sectionNum[tmpSection]) {
                    sectionNum[tmpSection] = 0;
                }

                function checkClosedBracket(data){
                    return(data.trim() === '}' ||  trimmedLine.trim() === '};');
                }
    
                if (trimmedLine !== "" || !trimmedLine.includes("```")) {
                    processedCode.push({
                        data: trimmedLine,
                        num: sectionNum[checkClosedBracket(trimmedLine) ? 0 : tmpSection]++, // Increment num within the section
                        codeSection: checkClosedBracket(trimmedLine) ? 0 : tmpSection,
                    });
                }   
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
        let processedData = preprocessCode(code.text, code.language);
        setProcessedData(processedData);
        let finalCode = devideFn(processedData);
        let randomfinalCode = randomFn(finalCode);
        setFinalCode(finalCode);
        setUserInput(new Array(randomfinalCode.length).fill([]));
        setRandomFinalCode(randomfinalCode);
        setInitialRandomFinalCode(randomfinalCode); // Save the initial random code
    }, [code.text, code.language, randomFn]);

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

    const completeFn = async() => {
        let correctBlocks = 0;
        let isCorrect = true;
      
        for (let i = 0; i < finalCode.length; i++) {
          for (let j = 0; j < finalCode[i].length; j++) {
            if (!userInput[i][j] || userInput[i][j].data !== finalCode[i][j].data) {
              isCorrect = false;
              break;
            } else {
              correctBlocks++;
            }
          }
          if (!isCorrect) break;
        }
      
        if (isCorrect) {
            console.log(`정답입니다! 총 ${correctBlocks}개의 블록을 맞췄습니다.`);
            try {
                const access_token = localStorage.getItem("access_token");
                const response = await axios.post(`https://alpm.duckdns.org:8080/history/create`, {
                      "problemType": "SEQUENCE",
                      "point": correctBlocks,
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
                    setBanner({ show: true, message: `정답입니다. 맞춘 블럭 수 : ${correctBlocks}`, type: 'success' });
                    window.location.reload(); // Refresh the page
                } else {
                    setBanner({ show: true, message: '학습 완료 중 오류가 발생했습니다.', type: 'error' });
                }
                } catch (error) {
                    console.error(error);
                    setBanner({ show: true, message: '학습 완료 중 오류가 발생했습니다.', type: 'error' });
                } 

            } else {
                setBanner({ show: true, message: '오답입니다. 다시 작성해주세요.', type: 'error' });
                console.log(finalCode);
                resetFn();
        }
    }

    const closeBanner = () => {
        setBanner({ show: false, message: '', type: '' });
    };
      

    return (
        <div>
            {banner.show && <TrackingBanner message={banner.message} type={banner.type} onClose={closeBanner} />}
            <div id="StudyLineOrdering" >
                <div id="StudyTrackingGuide">
                    <span> 학습 안내 _ 주어진 보기를 순서에 맞게 누른 뒤, 완료 버튼을 눌러주세요 </span>
                </div>
                <div id="StudyLineOrderingTextContainer">
                    {processedData && processedData.map((codeData, index) =>
                        <div key={index} >
                            {codeData.codeSection === 0 ? (
                                <textarea
                                    readOnly
                                    id="StudyLineOrderingCodeArea"
                                    rows={1}
                                    cols={countNumOfWord(codeData.data)}
                                    value={codeData.data}
                                    tabIndex={-1}
                                />
                            ) : (
                                <textarea
                                    readOnly
                                    id="StudyLineOrderingCodeArea"
                                    rows={1}
                                    cols={userInput[codeData.codeSection - 1] && userInput[codeData.codeSection - 1][codeData.num] ?countNumOfWord(userInput[codeData.codeSection - 1][codeData.num].data) : countNumOfWord(`\t[__${codeData.codeSection},${codeData.num + 1}__]`)}
                                    value={userInput[codeData.codeSection - 1] && userInput[codeData.codeSection - 1][codeData.num] ? userInput[codeData.codeSection - 1][codeData.num].data : `\t[__${codeData.codeSection},${codeData.num + 1}__]`}
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
