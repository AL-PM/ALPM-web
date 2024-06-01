import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './CodeDetail.css';
import MainMenuBar from '../../Etc/MainMenuBar/MainMenuBar.jsx';
import CodeDetailInfo from '../../Etc/CodeDetailInfo/CodeDetailInfo.jsx';
import CodeDetailBody from '../../Etc/CodeDetailBody/CodeDetailBody.jsx';
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner.jsx';

function CodeFollowBtn({ site }) {
    return (
        <button id="CodeFollowBtn" style={{color : site === "CodeGroup" ? "#009418" : "#FF6B00" }}>
            코드 그룹에 추가하기
        </button>
    );
}

function CodeDetail() {
    const { state } = useLocation();
    const [codeInfo, setCodeInfo] = useState(null);

    useEffect(() => {
        const fetchCodeGroupInfo = async () => {
            try {
                const access_token = localStorage.getItem('access_token');

                const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm/${state.id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });

                setCodeInfo(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCodeGroupInfo();
    }, [state]);

    if (!codeInfo) {
        return (
            <div id="CodeDetail">
                <MainMenuBar page={state.site} />
                {state.site === "CodeGroup" ?
                 <LoadingSpinner color={"#009418"}/>
                 :
                 <LoadingSpinner color={"#FF6B00"}/>
                }
            </div>
        );
    }

    return (
        <div id="CodeDetail">
            <MainMenuBar page={state.site} />
            <CodeDetailInfo verified={codeInfo.verified} language={codeInfo.language} owner={codeInfo.owner.name} name={codeInfo.name} />
            <CodeDetailBody content={codeInfo.original} description={codeInfo.description} owner={codeInfo.owner} />
            <CodeFollowBtn site={state.site} />
        </div>
    );
}

export default CodeDetail;
