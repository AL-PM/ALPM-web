import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeGroupSearchResult from "../../Etc/CodeGroupSearchResult/CodeGroupSearchResult";
import MyPageMenuBar from "../MyPageMenuBar/MyPageMenuBar";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar";
import './MyCodeGroup.css';

function MyCodeGroupNew() {
    return (
        <button id="NewCodeGroupBtn">새로운 코드 그룹 생성</button>
    );
}

function MyCodeGroup() {

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
                <MyPageMenuBar MyPage={"3"} />
            </div>
        );
    }

    console.log(searchResult);

    return (
        <div id="MyCodeGroup">
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"3"} />
            <CodeGroupSearchResult searchData={searchResult.content} bodyHeight={"60vh"} />
            <MyCodeGroupNew />
        </div>
    );
}

export default MyCodeGroup;
