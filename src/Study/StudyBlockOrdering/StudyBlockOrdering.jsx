import React from "react";
import './StudyBlockOrdering.css';

function StudyBlockOrdering(){
    const code = {
        "level" : 1,
        "text" : '#include <bits/stdc++.h>\n#define ll long long\nusing namespace std;\nll N, M;\nll arr[100005];\nvector<ll> SegTree;\nll Query(ll n, ll l, ll r, ll st, ll ed) {\n\t@if (l > $ed$ || r < $st$) // 탐색 범위를 벗어나는 경우\n\t\treturn $0$;\n\tif (l >= $st$ && r <= $ed$) // 목표 범위에 속하는 경우\n\t\treturn $SegTree[n]$;\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\treturn Query($n * 2$, $l$, $mid$, $st$, $ed$) + Query($n * 2 + 1$, $mid + 1$, $r$, $st$, $ed$); // 왼쪽 구간과 오른쪽 구간을 탐색\n}\n\nll Update(ll n, ll l, ll r, ll pos, ll x) {\n\tif (l > $pos$ || r < $pos$) // 탐색범위를 벗어나면\n\t\treturn $SegTree[n]$; // 해당 세그먼트 트리의 값을 반환\n\tif (l == $r$) { // leaf node에 도달하면\n\t\tSegTree[n] = $x$;\n\t\treturn $SegTree[n]$; // 새로 입력받은 값을 반환\n\t}\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\tSegTree[n] = Update($n * 2$, $l$, $mid$, $pos$, $x$) + Update($n * 2 + 1$, $mid + 1$, $r$, $pos$, $x$); // 왼쪽 구간과 오른쪽 구간을 탐색\n\treturn $SegTree[n]$;\n}\n\nll Init(ll n, ll l, ll r) {\n\tif (l == $r$) { // leaf node에 도달하면\n\t\tSegTree[n] = $arr[l]$; // arr[l] 값이 상위노드로 넘어감\n\t\treturn $SegTree[n]$;\n\t}\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\tSegTree[n] = Init($n * 2$, $l$, $mid$) + Init($n * 2 + 1$, $mid + 1$, $r$); // 왼쪽 구간과 오른쪽 구간으로 분할\n\treturn $SegTree[n]$;\n}\n\nint main() {\n\tios::sync_with_stdio(0);\n\tcin.tie(0);\n\n\tcin >> N >> M;\n\tfor (int i = 1; i <= N; i++)\n\t\tcin >> arr[i]; // 원소 입력 받음\n\n\tSegTree.resize(4 * N); // 세그먼트 트리 크기가 4*N 인 벡터 생성\n\tInit(1, 1, N); // 세그먼트 트리 초기화\n\n\tfor (int i = 0; i < M; i++) {\n\t\tll x, a, b;\n\t\tcin >> x >> a >> b;\n\t\tif (x) // x가 1이면\n\t\t\tcout << Query(1, 1, N, a, b) << "\\n"; // a번째부터 b번째까지의 합 출력\n\t\telse // x가 0이면\n\t\t\tUpdate(1, 1, N, a, b); // a번째 원소를 b로 변경\n\t}\n\n\treturn 0;\n}'
    };

    function preprocessCode(code) {
        // 코드 줄별로 분리
        let lines = code.split("\n");
    
        // 각 줄을 객체로 변환하여 저장할 배열
        let processedCode = [];
    
        // 각 줄에 대한 설명을 분리하는 함수
        function extractExplain(line) {
            let parts = line.split("//");
            return parts.length > 1 ? parts[1].trim() : "";
        }

        function extractCode(line) {
            let codeWithoutComment = line.split("//")[0]; // 주석 제거
            let trimmedCode = codeWithoutComment.replace(/\s+$/, ''); // 뒤쪽 공백 제거
            return trimmedCode;
        }

        // 코드를 객체로 변환하고 배열에 저장
        for (let i = 0; i < lines.length; i++) {
            let linedata = lines[i]
            let preprocessLine = linedata.split(" ");
            processedCode.push({
                blockData : preprocessLine,
                data: extractCode(lines[i]),
                num: i + 1, // 줄 수는 1부터 시작
            });
        }
    
        return processedCode;
    }

    let finalCode = "";


    // 코드별 설명 분리
    const data = code.text.split("\n");
    for(let i = 0 ; i < data.length ; i++){
        data[i] = data[i].split("//");
    }
    for(let i = 0 ; i < data.length ; i++){
        if(data[i].length === 2){
            finalCode = finalCode + data[i][0] + "\n";
        }else{
            finalCode = finalCode + data[i] + "\n";
        }
    }
    

    console.log(preprocessCode(code.text));

    // TextArea row 설정을 위해 코드 전체의 줄 수 계산
    // Font-size medium 기준 +3 해야함sss
    function countNumberOfCode(code) {
        return(code.split('\n').length + 3);
    }

    return(
        <div id="StudyBlockOrdering">
            <textarea readOnly
                id="StudyBlockOrderingCodeArea" 
                rows={countNumberOfCode(finalCode)}
                cols={150}
                defaultValue={finalCode} // defaultValue 속성 사용
            />
        </div>
    )
}

export default StudyBlockOrdering;