import React, { useState, useEffect } from "react";
import axios from 'axios';
import './StudyBlockOrdering.css';

function TrackingBanner({ message, type, onClose }) {
    return (
        <div className={`trackingbanner ${type}`}>
            {message}
            <button onClick={onClose} className={`trackingbanner-close-btn ${type}`}>확인</button>
        </div>
    );
}

function StudyBlockOrdering({problemCode, level}) {
    const [codeData, setCodeData] = useState(null);
    const [userInput, setUserInput] = useState([]);
    const [finalCode, setFinalCode] = useState("");
    const [banner, setBanner] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        function preprocessCode(code) {
            function getRandomNumbers(blockData, level) {
                let result = blockData.slice();
                let numOfBlank = level * 5;
                for (let i = result.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [result[i], result[j]] = [result[j], result[i]];
                }
                result.splice(numOfBlank);
                return result;
            }

            let finalCode = [];
            let trimmedCode = "";
            let processedCode = [];
            let blockData = [];
            let sortedblockData = [];
            let sortedlineupblockData = [];
            let lines = code.split("\n");

            function extractCode(line) {
                let codeWithoutComment = line.split(problemCode.language === "PYTHON" ? "#" : "//")[0];
                let tmpCode = codeWithoutComment.replace(/\s+$/, '');
                trimmedCode += tmpCode + "\n";
            }

            for (let i = 0; i < lines.length; i++) {
                extractCode(lines[i]);
            }

            let dollarSplitted = trimmedCode.split("$");

            for (let i = 0; i < dollarSplitted.length; i++) {
                let blank = 0;
                if (i % 2 === 1) {
                    blank = 1;
                    blockData.push({
                        data: dollarSplitted[i],
                        num: i + 1,
                        blank: blank,
                    });
                }
                processedCode.push({
                    data: dollarSplitted[i],
                    num: i + 1,
                    blank: blank,
                });
            }

            blockData = getRandomNumbers(blockData, level);

            blockData.forEach((element) => {
                sortedblockData.push({
                    data: element.data,
                    num: element.num,
                    blank: element.blank,
                });
            });

            let lineUp = 0;
            sortedblockData.sort((a, b) => a.num - b.num);

            sortedblockData.forEach((element) => {
                sortedlineupblockData.push({
                    data: element.data,
                    num: element.num,
                    blank: element.blank,
                    lineup: lineUp,
                });
                lineUp++;
            });

            finalCode = [processedCode, blockData, sortedlineupblockData];

            return finalCode;
        }

        const preprocessedCode = preprocessCode(problemCode.content);
        setCodeData(preprocessedCode);
    }, [problemCode, level]);

    useEffect(() => {
        if (codeData) {
            function totalTextMaker(codeData, blockData, userInput) {
                if (!codeData || !blockData) {
                    return "";
                }

                let totalCode = "";
                let blockNum = new Set(blockData.map(element => element.num));
                codeData.forEach((element) => {
                    if (blockNum.has(element.num)) {
                        let numB = findNumB(blockData, element.num);
                        if (userInput[numB] && userInput[numB].data !== "") {
                            totalCode += userInput[numB].data;
                        } else {
                            totalCode += " [__" + (numB + 1) + "__] ";
                        }
                    } else {
                        totalCode += element.data;
                    }
                });

                return totalCode;
            }

            const newFinalCode = totalTextMaker(codeData[0], codeData[2], userInput);
            setFinalCode(newFinalCode);
        }
    }, [userInput, codeData]);

    function countRows(codeData) {
        return codeData.split("\n").length;
    }

    function findNumB(blockData, numB) {
        let result = -1;
        blockData.forEach((element) => {
            let tmp = element.num;
            if (tmp === numB)
                result = element.lineup;
        });
        return result;
    }

    function totalTextMaker(codeData, blockData, userInput) {
        if (!codeData || !blockData) {
            return "";
        }

        let totalCode = "";
        let blockNum = new Set(blockData.map(element => element.num));
        codeData.forEach((element) => {
            if (blockNum.has(element.num)) {
                let numB = findNumB(blockData, element.num);
                if (userInput[numB] && userInput[numB].data !== "") {
                    totalCode += userInput[numB].data;
                } else {
                    totalCode += " [__BLANK_" + (numB + 1) + "_] ";
                }
            } else {
                totalCode += element.data;
            }
        });

        return totalCode;
    }

    if (!codeData) {
        return <div>Loading...</div>;
    }

    function exampleFn(eachBlock) {
        setUserInput(prevUserInput => {
            const updatedUserInput = [...prevUserInput, eachBlock];
            const newFinalCode = totalTextMaker(codeData[0], codeData[1], updatedUserInput);
            setFinalCode(newFinalCode);
            return updatedUserInput;
        });

        setCodeData(prevCodeData => {
            const updatedBlockData = prevCodeData[1].filter(block => block.num !== eachBlock.num);
            return [prevCodeData[0], updatedBlockData, prevCodeData[2]];
        });
    }

    function resetFn() {
        setUserInput([]);
        setCodeData(prevCodeData => {
            const allBlocks = [...prevCodeData[1], ...userInput];
            return [prevCodeData[0], allBlocks, prevCodeData[2]];
        });
        setFinalCode(totalTextMaker(codeData[0], codeData[1], []));
    }

    function countMarginBottom(length) {
        if (length < 5) {
            return "45vh";
        } else if (length < 10) {
            return "39vh";
        } else if (length < 15) {
            return "33vh";
        } else {
            return "15vh";
        }
    }

    const checkCompleteFn = async () => {
        const userInputtxt = userInput.map(element => element.data).join('');
        const blockDatatxt = codeData[2].map(element => element.data).join('');

        console.log(codeData[2]);

        if (userInputtxt === blockDatatxt) {
            console.log("정답입니다. 총 맞춘 블록의 수 : " + codeData[2].length);
            try {
                const access_token = localStorage.getItem("access_token");
                const response = await axios.post(`https://alpm.duckdns.org:8080/history/create`, {
                      "problemType": "BLOCK",
                      "point": codeData[2].length,
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
                    setBanner({ show: true, message: "정답입니다. 총 맞춘 블록의 수 : " + codeData[2].length, type: 'success' });
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
            resetFn();
        }
    }
    
    const closeBanner = () => {
        setBanner({ show: false, message: '', type: '' });
    };


    return (
        <div id="StudyBlockOrdering" style={{ marginBottom: countMarginBottom(userInput.length) }}>
             <div id="StudyTrackingGuide">
                    <span> 학습 안내 _ 주어진 보기를 순서에 맞게 누른 뒤, 완료 버튼을 눌러주세요 </span>
                </div>
            <textarea readOnly
                id="StudyBlockOrderingCodeArea"
                rows={countRows(finalCode)}
                cols={140}
                value={finalCode}
            />
            {userInput.length < level * 5 ?
                <div>
                    <div id="exampleBox">
                        <p style={{ fontFamily: 'SUITE-Regular' }}>{"[ 보기 ]"} </p>
                        <div id="exampleList">
                            {codeData[1].map((eachBlock) =>
                                <p
                                    key={eachBlock.num}
                                    onClick={() => exampleFn(eachBlock)}
                                >
                                    {eachBlock.data}
                                </p>
                            )}
                        </div>
                    </div>
                </div> : null}
            <div id="BlockOrderingBtnContainer">
                <button id="BlockOrderingBtn" onClick={resetFn}>초기화</button>
                <button id="BlockOrderingBtn" onClick={() => checkCompleteFn()}>완료</button>
            </div>
            {banner.show && <TrackingBanner message={banner.message} type={banner.type} onClose={closeBanner} />}
        </div>
    );
}

export default StudyBlockOrdering;
