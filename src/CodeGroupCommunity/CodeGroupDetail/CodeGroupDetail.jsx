import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MainMenuBar from '../../Etc/MainMenuBar/MainMenuBar.jsx';
import CodeSearchResult from '../../Etc/CodeSearchResult/CodeSearchResult.jsx';
import CodeGroupDetailInfo from '../../Etc/CodeGroupDetailInfo/CodeGroupDetailInfo.jsx';
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner.jsx';
import './CodeGroupDetail.css';

function Banner({ message, type }) {
  return (
    <div className={`banner ${type}`}>
      {message}
    </div>
  );
}

function CodeGroupFollowBtn({ codeGroupId, setBanner }) {
  const CodeGroupFollowFn = async () => {
    try {
      const access_token = localStorage.getItem('access_token');

      const response = await axios.patch(
        `https://alpm.duckdns.org:8080/codeGroup/import/${codeGroupId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setBanner({ show: true, message: '팔로우가 완료되었습니다', type: 'success' });
        setTimeout(() => {
          setBanner({ show: false, message: '', type: '' });
        }, 3000);
      } else {
        setBanner({ show: true, message: '팔로우에 실패하였습니다.', type: 'error' });
        setTimeout(() => {
          setBanner({ show: false, message: '', type: '' });
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setBanner({ show: true, message: '이미 팔로우중인 코드그룹입니다.', type: 'error' });
      } else {
        console.error(error);
        setBanner({ show: true, message: '코드 그룹 팔로우 중 오류가 발생했습니다', type: 'error' });
      }
      setTimeout(() => {
        setBanner({ show: false, message: '', type: '' });
      }, 3000);
    }
  };

  return (
    <button id="CodeGroupFollowBtn" onClick={CodeGroupFollowFn}>
      코드 그룹 팔로우하기
    </button>
  );
}

function CodeGroupDetail() {
  const { state } = useLocation();
  const [codeGroupInfo, setCodeGroupInfo] = useState();
  const [codeGroupPage, setCodeGroupPage] = useState();
  const [banner, setBanner] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchcodeGroupInfo = async () => {
      try {
        const access_token = localStorage.getItem('access_token');

        const response = await axios.get(`https://alpm.duckdns.org:8080/codeGroup/${state.id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
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
        const access_token = localStorage.getItem('access_token');

        const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm/codeGroup/${state.id}`, {
          params: {
            page: 0,
            size: 7,
          },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
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
        <LoadingSpinner color={"#009418"} comment={"코드 그룹 정보 불러오는 중"} />
      </div>
    );
  }

  return (
    <div id="CodeGroupDetail">
      <MainMenuBar page={"CodeGroup"} />
      {banner.show && <Banner message={banner.message} type={banner.type} />}
      <CodeGroupDetailInfo
        language={codeGroupInfo.language}
        verified={codeGroupInfo.verified}
        owner={codeGroupInfo.owner.id === 1 ? "AL-PM" : codeGroupInfo.owner.name}
        name={codeGroupInfo.name}
        numOfAlgorithm={codeGroupPage.content.length}
      />
      <CodeSearchResult searchData={codeGroupPage.content} bodyHeight={"55vh"} siteTag={state.site} />
      <CodeGroupFollowBtn codeGroupId={state.id} setBanner={setBanner} />
    </div>
  );
}

export default CodeGroupDetail;
