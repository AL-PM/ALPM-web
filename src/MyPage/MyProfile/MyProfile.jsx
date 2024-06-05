import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyProfile.css';
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar";
import MyPageMenuBar from "../MyPageMenuBar/MyPageMenuBar";
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner';
import ContributionGraph from './ContributionGraph';

function TextContainerVer1({ keyword, content }) {
    return (
        <div id="TextContainer">
            <span>{keyword}</span>
            <span>|</span>
            <span>{content}</span>
        </div>
    )
}

function TextContainerVer2({ keyword }) {
    return (
        <div id="TextContainer">
            <span>|</span>
            <span>{keyword}</span>
            <span>|</span>
        </div>
    )
}

function MyProfileUserInfo({ profile, name }) {
    return (
        <div id="MyProfileUserInfo">
            <img id="MyProfileUserImage" src={profile} alt="User Profile" />
            <div id="MyProfildUserInfoContainer">
                <TextContainerVer1 keyword={"이름"} content={name} />
            </div>
        </div>
    );
}

// Inside your MyProfileStudyHistory component
function MyProfileStudyHistory({ trace_point, fill_point, block_point, sequence_point, history_list }) {
    return (
        <div id="MyProfileStudyHistory">
            <div id="MyProfileStudyHistoryBody">
                <div >
                    <TextContainerVer2 keyword={"사용자 학습 통계"} />
                    <div id="MyProfileStudyHistoryNumeric">
                        <TextContainerVer1 keyword={"따라친 글자의 수"} content={trace_point} />
                        <TextContainerVer1 keyword={"순서를 맞춘 줄의 수"} content={sequence_point} />
                        <TextContainerVer1 keyword={"순서를 맞춘 빈칸의 수"} content={block_point} />
                        <TextContainerVer1 keyword={"채운 빈칸의 수"} content={fill_point} />
                    </div>
                </div>
                <div style={{marginLeft : "7.5vw"}} >
                    <TextContainerVer2 keyword={"일일 학습 기록"} />
                    <div id="MyProfileStudyHistoryGrass">
                        <ContributionGraph historyList={history_list} />
                    </div>
                </div>
            </div>
        </div>
    );
}


function MyProfile() {
    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const uid = localStorage.getItem("uid");

                const response = await axios.get(`https://alpm.duckdns.org:8080/user/${uid}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                setUserData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return (
            <div>
                <MainMenuBar page={"MyPage"} />
                <MyPageMenuBar MyPage={"1"} />
                <LoadingSpinner color={"#EF4949"} comment={"내 정보 불러오는 중"}/>
            </div>
        );
    }

    console.log(userData);

    return (
        <div>
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"1"} />
            <MyProfileUserInfo 
                name={userData.name} 
                profile={userData.profile} 
            />
            <MyProfileStudyHistory
                trace_point={userData.tracePoint}
                fill_point={userData.fillPoint}
                sequence_point={userData.sequencePoint}
                block_point={userData.blockPoint}
                history_list={userData.historyList} 
            />
        </div>
    );
}

export default MyProfile;
