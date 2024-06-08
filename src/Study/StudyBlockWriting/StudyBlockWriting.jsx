import React, { useState, useEffect } from "react";
import axios from 'axios';
import './StudyBlockWriting.css';

function TrackingBanner({ message, type, onClose }) {
    return (
        <div className={`trackingbanner ${type}`}>
            {message}
            <button onClick={onClose} className={`trackingbanner-close-btn ${type}`}>확인</button>
        </div>
    );
}

function StudyBlockWriting({problemCode, level}) {
    const [codeData, setCodeData] = useState(null);
    const [userInput, setUserInput] = useState([]);
    const [finalCode, setFinalCode] = useState("");
    const [banner, setBanner] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        const code = {
            text: problemCode.content,
            language: problemCode.language
        };

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
                let codeWithoutComment = line.split("//")[0];
                let tmpCode = codeWithoutComment.replace(/\s+$/, '');
                if (code.language === "PYTHON") {
                    tmpCode = codeWithoutComment.split("#")[0];
                }
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

        const preprocessedCode = preprocessCode(code.text);

        // UserInput 초기화
        const numOfBlanks = preprocessedCode[2].length;
        let tmpUserInput = Array.from({ length: numOfBlanks }, (_, i) => ({
            num: i + 1,
            data: "",
        }));

        setUserInput(tmpUserInput);

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

    function resetFn() {
        const numOfBlanks = codeData[2].length;
        let tmpUserInput = Array.from({ length: numOfBlanks }, (_, i) => ({
            num: i + 1,
            data: "",
        }));

        setUserInput(tmpUserInput);
        setCodeData(prevCodeData => {
            const allBlocks = [...prevCodeData[1], ...userInput];
            return [prevCodeData[0], allBlocks, prevCodeData[2]];
        });
        setFinalCode(totalTextMaker(codeData[0], codeData[1], []));
    }

    const checkCompleteFn = async() => {
        const removeSpaces = str => str.replace(/\s+/g, '');

        const userInputtxt = removeSpaces(userInput.map(element => element.data).join(''));
        const blockDatatxt = removeSpaces(codeData[2].map(element => element.data).join(''));

        console.log(codeData[2]);

        if (userInputtxt === blockDatatxt) {
            console.log("정답입니다. 맞춘 블럭 수 : " + codeData[2].length);
            try {
                const access_token = localStorage.getItem("access_token");
                const response = await axios.post(`https://alpm.duckdns.org:8080/history/create`, {
                      "problemType": "FILL",
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
                    setBanner({ show: true, message: "정답입니다. 맞춘 블럭 수 : " + codeData[2].length, type: 'success' });
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

    const handleInputChange = (index, value) => {
        setUserInput(prevUserInput => {
            const updatedUserInput = prevUserInput.map((input, i) => (
                i === index ? { ...input, data: value } : input
            ));
            return updatedUserInput;
        });
    };

    return (
        <div id="StudyBlockWriting" >
            <div id="StudyTrackingGuide">
                    <span> 학습 안내 _ 주어진 보기에 맞춰 답변을 작성한 후, 완료 버튼을 눌러주세요 </span>
                </div>
            {banner.show && <TrackingBanner message={banner.message} type={banner.type} onClose={closeBanner} />}
            <textarea readOnly
                id="StudyBlockWritingCodeArea"
                rows={countRows(finalCode)}
                cols={140}
                value={finalCode}
            />
            <div>
                <div id="exampleBox">
                    <p style={{ fontFamily: 'SUITE-Regular' }}>{"[ 답변 작성란 ]"} </p>
                    <div id="exampleList">
                        {userInput.map((eachBlock, index) =>
                            <div key={eachBlock.num} id="exampleListBlock">
                                <p style={{ width: "10px" }}>{eachBlock.num}</p>
                                <input 
                                    id="exampleInput" 
                                    value={eachBlock.data} 
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div> 
            <div id="BlockOrderingBtnContainer">
                <button id="BlockOrderingBtn" onClick={resetFn}>초기화</button>
                <button id="BlockOrderingBtn" onClick={() => checkCompleteFn()}>완료</button>
            </div>
        </div>
    );
}

export default StudyBlockWriting;
