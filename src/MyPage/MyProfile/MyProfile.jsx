import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyProfile.css';
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar";
import MyPageMenuBar from "../MyPageMenuBar/MyPageMenuBar";

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

function MyProfileStudyHistory({ trace_point, fill_point, block_point, sequence_point, history_list }) {
    
    return (
        <div id="MyProfileStudyHistory">
            <div id="MyProfileStudyHistoryLogo">
                <TextContainerVer2 keyword={"사용자 학습 통계"} />
            </div>
            <div id="MyProfileStudyHistoryBody">
                <div id="MyProfileStudyHistoryNumeric">
                    <TextContainerVer1 keyword={"따라친 글자의 수"} content={trace_point} />
                    <TextContainerVer1 keyword={"순서를 맞춘 줄의 수"} content={sequence_point} />
                    <TextContainerVer1 keyword={"순서를 맞춘 빈칸의 수"} content={block_point} />
                    <TextContainerVer1 keyword={"채운 빈칸의 수"} content={fill_point} />
                </div>
                <div id="MyProfileStudyHistoryGrass">
                    <span>사용자 연속 학습 기록 [잔디] 추가 예정</span>
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
                <p>LOADING</p>
            </div>
        );
    }

    return (
        <div>
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"1"} />
            <MyProfileUserInfo 
                name={userData.name} 
                profile={userData.profile} 
            />
            <MyProfileStudyHistory
                trace_point={userData.trace_point}
                fill_point={userData.fill_point}
                sequence_point={userData.sequence_point}
                block_point={userData.block_point}
                history_list={userData.history_list} 
            />
        </div>
    );
}

export default MyProfile;
