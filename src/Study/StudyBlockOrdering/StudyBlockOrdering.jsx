import React, { useState, useEffect } from "react";
import './StudyBlockOrdering.css';

function StudyBlockOrdering({problemCode, level}) {
    const [codeData, setCodeData] = useState(null);
    const [userInput, setUserInput] = useState([]);
    const [finalCode, setFinalCode] = useState("");

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

    function checkCompleteFn() {
        const userInputtxt = userInput.map(element => element.data).join('');
        const blockDatatxt = codeData[2].map(element => element.data).join('');

        if (userInputtxt === blockDatatxt) {
            alert("정답입니다.");
        } else {
            resetFn();
            alert("옳지 않은 답변입니다. 다시 작성해주세요");
        }
    }

    return (
        <div id="StudyBlockOrdering" style={{ marginBottom: countMarginBottom(userInput.length) }}>
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
                <button id="BlockOrderingBtn" style={{ borderColor: "#EF4949" }} onClick={resetFn}>초기화</button>
                <button id="BlockOrderingBtn" style={{ borderColor: "#5C4EFF" }} onClick={() => checkCompleteFn()}>완료</button>
            </div>
        </div>
    );
}

export default StudyBlockOrdering;
