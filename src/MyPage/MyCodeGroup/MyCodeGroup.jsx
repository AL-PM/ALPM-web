import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeGroupSearchResult from "../../Etc/CodeGroupSearchResult/CodeGroupSearchResult";
import MyPageMenuBar from "../MyPageMenuBar/MyPageMenuBar";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar";

function MyCodeGroupNew(){
    return(
        <button id="CodeHomeUploadButton" >새로운 코드 그룹 생성</button>
    )
}

function MyCodeGroup(){

    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const uid = localStorage.getItem("uid");

                const response = await axios.get(`https://alpm.duckdns.org:8080/codeGroup/user/${uid}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                setSearchResult(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();

    }, []);

    if (!searchResult) {
        return (
            <div id="MyCodeGroup">
                <MainMenuBar page={"MyPage"} />
                <MyPageMenuBar MyPage={"3"}/>
            </div>
        );
    }

    console.log(searchResult);

    const searchData = [
        {
            "id": 1,
            "name": "다양한 정렬 알고리즘",
            "referencedCount": 2,
            "verified": true,
            "visible": true,
            "language": "Python",
            "owner" : "Byeongchan"
        },
        {
            "id": 2,
            "name": "스택 관련 자료 구조",
            "referencedCount": 2,
            "verified": true,
            "visible": true,
            "language": "Python",
            "owner" : "Rangjin"
        },
        {
            "id": 3,
            "name": "Knapsack",
            "referencedCount": 4,
            "verified": true,
            "visible": true,
            "language": "Python",
            "owner" : "HyeonWoo"
        },
        {
            "id": 4,
            "name": "n-queen problem",
            "referencedCount": 4,
            "verified": null,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 5,
            "name": "Linked-List",
            "referencedCount": 4,
            "verified": null,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 6,
            "name": "Binary Search",
            "referencedCount": 4,
            "verified": false,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 7,
            "name": "Tree Search",
            "referencedCount": 4,
            "verified": false,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
    ]
    return(
        <div id="MyCodeGroup">
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"3"}/>
            <CodeGroupSearchResult searchData={searchData} bodyHeight={"60vh"}/>
            <MyCodeGroupNew />
        </div>
    )
}
export default MyCodeGroup;