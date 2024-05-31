import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar";
import MyPageMenuBar from "../MyPageMenuBar/MyPageMenuBar";

function MyCodeBoard(){

    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const uid = localStorage.getItem("uid");

                const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm/user/${uid}`, {
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
                <MyPageMenuBar MyPage={"2"}/>
            </div>
        );
    }

    console.log(searchResult);

    const searchData = [
        {
            "id": 1,
            "name": "퀵 정렬",
            "referencedCount": 2,
            "verified": true,
            "language": "Python",
            "owner" : "Byeongchan"
        },
        {
            "id": 2,
            "name": "버블 정렬",
            "referencedCount": 2,
            "verified": true,
            "language": "Python",
            "owner" : "Rangjin"
        },
        {
            "id": 3,
            "name": "힙 정렬",
            "referencedCount": 4,
            "verified": true,
            "language": "Python",
            "owner" : "HyeonWoo"
        },
        {
            "id": 4,
            "name": "버블 정렬",
            "referencedCount": 4,
            "verified": null,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 4,
            "name": "버블 정렬",
            "referencedCount": 4,
            "verified": null,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 4,
            "name": "버블 정렬",
            "referencedCount": 4,
            "verified": null,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 4,
            "name": "버블 정렬",
            "referencedCount": 4,
            "verified": null,
            "language": "Python",
            "owner" : "MoonKee"
        },
    ]
    return(
        <div id="MyCodeBoard">
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"2"}/>
            <CodeSearchResult searchData={searchData} bodyHeight={"66vh"} siteTag={"MyPage"}/>
        </div>
    )
}

export default MyCodeBoard;