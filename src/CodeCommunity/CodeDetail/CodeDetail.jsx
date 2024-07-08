import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './CodeDetail.css';
import MainMenuBar from '../../Etc/MainMenuBar/MainMenuBar.jsx';
import CodeDetailInfo from '../../Etc/CodeDetailInfo/CodeDetailInfo.jsx';
import CodeDetailBody from '../../Etc/CodeDetailBody/CodeDetailBody.jsx';
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner.jsx';

function Banner({ message, type }) {
    return (
      <div className={`banner ${type}`}>
        {message}
      </div>
    );
  }

function CodeFollowBtn({ site , codeGroupInfo, codeId, language }) {
    const [target, setTarget] = useState(0);
    const [banner, setBanner] = useState({ show: false, message: '', type: '' });


    const defaultCodeGroup = { 
        id: -1, 
        name: "Default", 
        language: "Default", 
        algorithm_count: 1 , 
        owner : {
            id : 0,
            name : "Default",
        }
    };

    // 원하는 언어와 일치하는 코드 그룹 정보를 필터링하여 추가
    const filteredCodeGroupList = [defaultCodeGroup, ...codeGroupInfo.filter(group => group.language === language)];


    const codeFollowFn = async () => {

        if(target > 0){
            try {
                const access_token = localStorage.getItem("access_token");

                const response = await axios.patch(
                    `https://alpm.duckdns.org:8080/codeGroup/import/${target}/${codeId}`, 
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
                    setBanner({ show: true, message: '코드 추가가 완료되었습니다', type: 'success' });
                    setTimeout(() => {
                    setBanner({ show: false, message: '', type: '' });
                    }, 3000);
                }
            } catch (error) {
                setBanner({ show: true, message: '실패 : 코드 그룹을 올바르게 선택하고 다시 시도해주세요.', type: 'error' });
                setTimeout(() => {
                setBanner({ show: false, message: '', type: '' });
                }, 3000);
            }
        }else{
            setBanner({ show: true, message: '실패 : 코드 그룹을 올바르게 선택하고 다시 시도해주세요.', type: 'error' });
                setTimeout(() => {
                setBanner({ show: false, message: '', type: '' });
                }, 3000);
        }
    }

    function valueChangeFn(groupID) {
        setTarget(groupID);
    }

    return (
        <div id='codeFollowBtnContainer'>
            {banner.show && <Banner message={banner.message} type={banner.type} />}
            <div id='codeFollowGroupSetting'>
                <span id="SettingBarSetting" style={{ width: "20vw", display: 'flex', justifyContent: 'center' }}>추가할 코드 그룹</span>
                <span>|</span>
                <select name="CodeGroupSetting" id="CodeGroupSetting" style={{ width: "20vw", display: 'flex', justifyContent: 'center' }} onChange={(event) => valueChangeFn(event.target.value)}>
                    {filteredCodeGroupList.map((codegrouptag) =>
                        <option id="CodeGroupSettingList" key={codegrouptag.id} value={codegrouptag.id}> 
                        { codegrouptag.id === -1 ?
                            <span>선택 안됨</span>
                            :
                            <span>{codegrouptag.name} / {codegrouptag.language} / {codegrouptag.owner.id === 1 ? "AL-PM" : codegrouptag.owner.name}</span>
                        }
                        </option>
                    )}
                </select>
            </div>
            <button id="CodeFollowBtn" onClick={codeFollowFn} style={{ color: site === "CodeGroup" ? "#009418" : "#FF6B00" }}>
                <span>코드 그룹에 추가하기</span>
            </button>
        </div>
    );
}


function CodeDetail() {
    const {state} = useLocation();
    const [codeInfo, setCodeInfo] = useState(null);
    const [codeGroupInfo, setCodeGroupInfo] = useState(null);

    useEffect(() => {
        const fetchCodeInfo = async () => {
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

        const fetchCodeGroupInfo = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const uid = localStorage.getItem("uid");

                const response = await axios.get(`https://alpm.duckdns.org:8080/codeGroup/user/${uid}`, {
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

        fetchCodeInfo();
        fetchCodeGroupInfo();

    }, [state]);

    if (!codeInfo || !codeGroupInfo) {
        return (
            <div id="CodeDetail">
                <MainMenuBar page={state.site} />
                {state.site === "CodeGroup" ?
                 <LoadingSpinner color={"#009418"} comment={"코드 정보 불러오는 중"}/>
                 :
                 <LoadingSpinner color={"#FF6B00"} comment={"코드 정보 불러오는 중"}/>
                }
            </div>
        );
    }

    console.log(codeInfo,codeGroupInfo);

    return (
        <div id="CodeDetail">
            <MainMenuBar page={state.site} />
            <CodeDetailInfo verified={codeInfo.verified} language={codeInfo.language} owner={codeInfo.owner.id === 1 ? "AL-PM" : codeInfo.owner.name} name={codeInfo.name} />
            <CodeDetailBody site={state.site} content={codeInfo.original} description={codeInfo.description} language={codeInfo.language} owner={codeInfo.owner} />
            <CodeFollowBtn site={state.site} codeGroupInfo={codeGroupInfo.content} codeId={state.id} language={codeInfo.language}/>
        </div>
    );
}

export default CodeDetail;
