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

    if (!searchResult){
        return (
            <div id="MyCodeGroup">
                <MainMenuBar page={"MyPage"} />
                <MyPageMenuBar MyPage={"3"}/>
            </div>
        );
    }

    console.log(searchResult);

    const searchData = 
        [
            {
                "id": 2,
                "name": "TestCodeGroup1",
                "referenced_count": 1,
                "verified": false,
                "visible": true,
                "language": "C",
                "owner": {
                    "id": 5,
                    "name": "박병찬",
                    "profile": "https://lh3.googleusercontent.com/a/ACg8ocKm6uFzZ4gkbhBCMIcRzezmSYUeFG1Kv40fuwz7e7XRm7UigqdC=s96-c"
                },
                "created_at": "2024-05-31T03:44:44.479416",
                "updated_at": "2024-05-31T03:44:44.479422"
            },
            {
                "id": 1,
                "name": "TestCodeGroup1",
                "referenced_count": 1,
                "verified": false,
                "visible": true,
                "language": "C",
                "owner": {
                    "id": 5,
                    "name": "박병찬",
                    "profile": "https://lh3.googleusercontent.com/a/ACg8ocKm6uFzZ4gkbhBCMIcRzezmSYUeFG1Kv40fuwz7e7XRm7UigqdC=s96-c"
                },
                "created_at": "2024-05-31T03:38:56.982095",
                "updated_at": "2024-05-31T03:38:56.982102"
            }
        ]

    return(
        <div id="MyCodeGroup">
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"3"}/>
            <CodeGroupSearchResult searchData={searchData} bodyHeight={"60vh"} />
            <MyCodeGroupNew />
        </div>
    )
}
export default MyCodeGroup;