import React, { useState, useEffect } from "react";
import './StudyBlockWriting.css';

function StudyBlockWriting({problemCode, level}) {
    const [codeData, setCodeData] = useState(null);
    const [userInput, setUserInput] = useState([]);
    const [finalCode, setFinalCode] = useState("");

    useEffect(() => {
        const code = {
            text: problemCode.content,
            language: problemCode.language
        };

        // UserInput 초기화
        const numOfBlanks = level * 5;
        let tmpUserInput = Array.from({ length: numOfBlanks }, (_, i) => ({
            num: i + 1,
            data: "",
        }));

        setUserInput(tmpUserInput);

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
        const numOfBlanks = level * 5;
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

    function checkCompleteFn() {
        const removeSpaces = str => str.replace(/\s+/g, '');

        const userInputtxt = removeSpaces(userInput.map(element => element.data).join(''));
        const blockDatatxt = removeSpaces(codeData[2].map(element => element.data).join(''));

        console.log(codeData[2]);

        if (userInputtxt === blockDatatxt) {
            alert("정답입니다. 맞춘 블럭 수 : " + codeData[2].length);
        } else {
            resetFn();
            alert("옳지 않은 답변입니다. 다시 작성해주세요");
        }
    }

    const handleInputChange = (index, value) => {
        setUserInput(prevUserInput => {
            const updatedUserInput = prevUserInput.map((input, i) => (
                i === index ? { ...input, data: value } : input
            ));
            return updatedUserInput;
        });
    };

    return (
        <div id="StudyBlockOrdering" >
            <textarea readOnly
                id="StudyBlockOrderingCodeArea"
                rows={countRows(finalCode)}
                cols={140}
                value={finalCode}
            />
            <div>
                <div id="exampleBox">
                    <p style={{ fontFamily: 'SUITE-Regular' }}>{"[ 답변 작성란 ] : 각 빈칸의 번호에 맞게 작성후 완료 버튼을 눌러주세요 "} </p>
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
