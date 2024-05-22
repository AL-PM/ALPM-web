
import React, { useState, useEffect } from "react";
import './StudyBlockOrdering.css';

function StudyBlockOrdering() {
    const [codeData, setCodeData] = useState(null);
    const [userInput, setUserInput] = useState([]);
    const [finalCode, setFinalCode] = useState("");

    useEffect(() => {
        const code = {
            "level": 1,
            "text": '#include <bits/stdc++.h>\n#define ll long long\nusing namespace std;\nll N, M;\nll arr[100005];\nvector<ll> SegTree;\nll Query(ll n, ll l, ll r, ll st, ll ed) {\n\tif (l > $ed$ || r < $st$) // 탐색 범위를 벗어나는 경우\n\t\treturn $0$;\n\tif (l >= $st$ && r <= $ed$) // 목표 범위에 속하는 경우\n\t\treturn $SegTree[n]$;\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\treturn Query($n * 2$, $l$, $mid$, $st$, $ed$) + Query($n * 2 + 1$, $mid + 1$, $r$, $st$, $ed$); // 왼쪽 구간과 오른쪽 구간을 탐색\n}\n\nll Update(ll n, ll l, ll r, ll pos, ll x) {\n\tif (l > $pos$ || r < $pos$) // 탐색범위를 벗어나면\n\t\treturn $SegTree[n]$; // 해당 세그먼트 트리의 값을 반환\n\tif (l == $r$) { // leaf node에 도달하면\n\t\tSegTree[n] = $x$;\n\t\treturn $SegTree[n]$; // 새로 입력받은 값을 반환\n\t}\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\tSegTree[n] = Update($n * 2$, $l$, $mid$, $pos$, $x$) + Update($n * 2 + 1$, $mid + 1$, $r$, $pos$, $x$); // 왼쪽 구간과 오른쪽 구간을 탐색',
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

            blockData = getRandomNumbers(blockData, 3);

            
            blockData.forEach((element) => {
                sortedblockData.push({
                    data : element.data,
                    num : element.num,
                    blank : element.blank,
                });
            });

            let lineUp = 0;
            sortedblockData.sort((a, b) => a.num - b.num);

            sortedblockData.forEach((element) =>{
                sortedlineupblockData.push({
                    data : element.data,
                    num : element.num,
                    blank : element.blank,
                    lineup : lineUp,
                });
                lineUp++;
            })

            finalCode = [processedCode, blockData, sortedlineupblockData];

            return finalCode;
        }

        const preprocessedCode = preprocessCode(code.text);
        setCodeData(preprocessedCode);

    }, []);

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
                        if(userInput[numB] && userInput[numB].data!== ""){
                            totalCode += userInput[numB].data;
                        }else{
                            totalCode += " [__BLANK_" + (numB + 1) + "_] ";
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

    function findNumB(blockData, numB){
        let result = -1;
        blockData.forEach((element) => {
            let tmp = element.num;
            if(tmp === numB)
                result = element.lineup;
        })
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
                if(userInput[numB] && userInput[numB].data!== ""){
                    totalCode += userInput[numB].data;
                }else{
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
        
        console.log(userInput, codeData[1]);
    }

    return (
        <div id="StudyBlockOrdering" style={userInput.length < 15 ? {marginBottom : "35vh"} : {marginBottom : "7.5vh"} }>
            <textarea readOnly
                id="StudyBlockOrderingCodeArea"
                rows={countRows(finalCode) + 1}
                cols={140}
                value={finalCode}
            />
            {userInput.length < 15 ? 
            <div>
                <div id="exampleBox">
                    <p style={{ fontFamily: 'SUITE-Regular' }}>{"[ 보기 ]"} </p>
                    <div id="exampleList">
                        {codeData[1].map((eachBlock) =>
                            <p
                                key={eachBlock.num}
                                id="exampleListBlock"
                                onClick={() => exampleFn(eachBlock)}
                            >
                                {eachBlock.data}
                            </p>
                        )}
                    </div>
                </div>
            </div> : null}
        </div>
    );
}

export default StudyBlockOrdering;
