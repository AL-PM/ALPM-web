import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useLocation} from "react-router-dom"
import './CodeDetail.css';
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx";
import CodeDetailInfo from "../../Etc/CodeDetailInfo/CodeDetailInfo.jsx";
import CodeDetailBody from "../../Etc/CodeDetailBody/CodeDetailBody.jsx";

function CodeFollowBtn(){
    return(
        <button id="CodeFollowBtn">코드 그룹에 추가하기</button>
    )
}

function CodeDetail(){
    const {state} = useLocation();
    const [codeInfo, setCodeInfo] = useState();

    useEffect(() => {
        const fetchcodeGroupInfo = async () => {
            try {
                const access_token = localStorage.getItem("access_token");

                const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm/${state.id}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                setCodeInfo(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchcodeGroupInfo();

    }, [state]);

    console.log(state);

    console.log(codeInfo);
    let Data = {
        "id": state.id,
        "name": "TestCode", 
        "referencedCount": 3,
        "verified": true,
        "language": "JAVA",
        "content" : '#include <bits/stdc++.h>\n#define ll long long\nusing namespace std;\nll N, M;\nll arr[100005];\nvector<ll> SegTree;\nll Query(ll n, ll l, ll r, ll st, ll ed) {\n    if (l > $ed$ || r < $st$) // 탐색 범위를 벗어나는 경우\n        return $0$;\n    if (l >= $st$ && r <= $ed$) // 목표 범위에 속하는 경우\n        return $SegTree[n]$;\n    ll mid = $(l + r) / 2$; // 중심값 선언\n    return Query($n * 2$, $l$, $mid$, $st$, $ed$) + Query($n * 2 + 1$, $mid + 1$, $r$, $st$, $ed$); // 왼쪽 구간과 오른쪽 구간을 탐색\n}\n\nll Update(ll n, ll l, ll r, ll pos, ll x) {\n    if (l > $pos$ || r < $pos$) // 탐색범위를 벗어나면\n    return $SegTree[n]$; // 해당 세그먼트 트리의 값을 반환\n    if (l == $r$) { // leaf node에 도달하면\n    SegTree[n] = $x$;\n    return $SegTree[n]$; // 새로 입력받은 값을 반환\n    }\n    ll mid = $(l + r) / 2$; // 중심값 선언\n    SegTree[n] = Update($n * 2$, $l$, $mid$, $pos$, $x$) + Update($n * 2 + 1$, $mid + 1$, $r$, $pos$, $x$); // 왼쪽 구간과 오른쪽 구간을 탐색\n    return $SegTree[n]$;\n}\n\nll Init(ll n, ll l, ll r) {\n    if (l == $r$) { // leaf node에 도달하면\n    SegTree[n] = $arr[l]$; // arr[l] 값이 상위노드로 넘어감\n    return $SegTree[n]$;\n    }\n    ll mid = $(l + r) / 2$; // 중심값 선언\n    SegTree[n] = Init($n * 2$, $l$, $mid$) + Init($n * 2 + 1$, $mid + 1$, $r$); // 왼쪽 구간과 오른쪽 구간으로 분할\n    return $SegTree[n]$;\n}\n\nint main() {\n    ios::sync_with_stdio(0);\n    cin.tie(0);\n\n    cin >> N >> M;\n    for (int i = 1; i <= N; i++)\n    cin >> arr[i]; // 원소 입력 받음\n\n    SegTree.resize(4 * N); // 세그먼트 트리 크기가 4*N 인 벡터 생성\n    Init(1, 1, N); // 세그먼트 트리 초기화\n\n    for (int i = 0; i < M; i++) {\n        ll x, a, b;\n        cin >> x >> a >> b;\n    if (x) // x가 1이면\n            cout << Query(1, 1, N, a, b) << "\\n"; // a번째부터 b번째까지의 합 출력\n        else // x가 0이면\n            Update(1, 1, N, a, b); // a번째 원소를 b로 변경\n    }\n\n    return 0;\n}',
        "description": "Test description Ex",
        "owner": {
          "id": 20192830, 
          "name": "Soongsil Univ",
          "profile": "종강시켜주세요 제발 ㅠㅠ"
        }
      }
    return(
        <div id="CodeDetail">
            <MainMenuBar page={state.site} />
            <CodeDetailInfo verified={Data.verified} language={Data.language} owner={Data.owner.name} name={Data.name}/>
            <CodeDetailBody content={Data.content} description={Data.description} owner={Data.owner}/>
            <CodeFollowBtn />
        </div>
    )

}

export default CodeDetail;