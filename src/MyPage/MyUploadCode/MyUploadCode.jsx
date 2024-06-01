import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar";
import MyPageMenuBar from "../MyPageMenuBar/MyPageMenuBar";
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner';

function MyUploadCode(){

    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const uid = localStorage.getItem("uid");

                const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm/owner/${uid}`, {
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
                <MyPageMenuBar MyPage={"4"}/>
                <LoadingSpinner color={"EF4949"} comment={"Loading"}/>
            </div>
        );
    }

    console.log(searchResult);

    return(
        <div id="MyUploadCode">
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"4"}/>
            <CodeSearchResult searchData={searchResult.content} bodyHeight={"66vh"}/>
        </div>
    )
}

export default MyUploadCode;