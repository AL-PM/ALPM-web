import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useLocation} from "react-router-dom"
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult.jsx";
import CodeGroupDetailInfo from "../../Etc/CodeGroupDetailInfo/CodeGroupDetailInfo.jsx";
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner.jsx';
import './CodeGroupDetail.css';


function CodeGroupFollowBtn({codeGroupId}){

    const CodeGroupFollowFn = async () => {
        try {
            const access_token = localStorage.getItem("access_token");
    
            const response = await axios.patch(
                `https://alpm.duckdns.org:8080/codeGroup/import/${codeGroupId}`, 
                {}, // 빈 객체를 두 번째 인수로 보냅니다
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
    
            if (response.status === 200) {
                alert('팔로우가 완료되었습니다');
            } else {
                alert('팔로우에 실패하였습니다.')
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('이미 팔로우중인 코드그룹입니다.');
            } else {
                console.error(error);
                alert('코드 그룹 팔로우 중 오류가 발생했습니다');
            }
        }
    }
    

    return(
        <button id="CodeGroupFollowBtn" onClick={CodeGroupFollowFn} >코드 그룹 팔로우하기</button>
    )
}

function CodeGroupDetail(){
    const {state} = useLocation();
    const [codeGroupInfo, setCodeGroupInfo] = useState();
    const [codeGroupPage, setCodeGroupPage] = useState();

    useEffect(() => {
        const fetchcodeGroupInfo = async () => {
            try {
                const access_token = localStorage.getItem("access_token");

                const response = await axios.get(`https://alpm.duckdns.org:8080/codeGroup/${state.id}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                setCodeGroupInfo(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchcodeGroupInfo();

    }, [state]);

    useEffect(() => {
        const fetchcodeGroupPage = async () => {
            try {
                const access_token = localStorage.getItem("access_token");

                const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm/codeGroup/${state.id}`, {
                    params:
                        {
                            "page": 0,
                            "size": 7
                        },
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                setCodeGroupPage(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchcodeGroupPage();

    }, [state]);

    if (!codeGroupInfo || !codeGroupPage) {
        return (
            <div id="CodeGroupDetail">
                <MainMenuBar page={"CodeGroup"} />
                <LoadingSpinner color={"#009418"}/>
            </div>
        );
    }

    console.log(codeGroupInfo, codeGroupPage);

    return(
        <div id="CodeGroupDetail">
            <MainMenuBar page={"CodeGroup"} />
            <CodeGroupDetailInfo language={codeGroupInfo.language} verified={codeGroupInfo.verified} owner={codeGroupInfo.owner.name} name={codeGroupInfo.name} numOfAlgorithm={codeGroupPage.content.length}/>
            <CodeSearchResult searchData={codeGroupPage.content} bodyHeight={"55vh"} siteTag={state.site}/>
            <CodeGroupFollowBtn codeGroupId={state.id}/>
        </div>
    )
}

export default CodeGroupDetail;