import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CodeHome.css";
import { useNavigate } from "react-router-dom";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx";
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult.jsx";
import CommunitySearchBar from "../../Etc/CommunitySearchBar/CommunitySearchBar.jsx";
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner.jsx';

function CodeHomeUploadButton() {
    const navigate = useNavigate();
    return (
        <button id="CodeHomeUploadButton" onClick={() => navigate('/mypage/NewCode')}>새로운 코드 업로드</button>
    );
}

function CodeCommunity() {
    const [language, setLanguage] = useState("PYTHON");
    const [reference, setReference] = useState(null);
    const [searchKeyword, setKeyword] = useState("");
    const [searchResult, setSearchResult] = useState();
    const [currentPage, setCurrentPage] = useState(0); // Current page state
    const [searchIsOn, setSearchIsOn] = useState(false);

    useEffect(() => {
        const fetchSearchCode = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm/search`, {
                    params: {
                        language: language,
                        verified: reference,
                        keyword: searchKeyword,
                        page: currentPage, // Use currentPage state
                        size: 6
                    },
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
        const fetchTotalCode = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm/`, {
                    params: {
                        page: currentPage, // Use currentPage state
                        size: 6
                    },
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
        if (searchIsOn) {
            fetchSearchCode();
        } else {
            fetchTotalCode();
        }
    }, [currentPage, searchIsOn, language, reference, searchKeyword]); // Dependency array includes currentPage

    const handleNextPage = () => {
        if (currentPage < searchResult.totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (!searchResult) {
        return (
            <div id="MyCodeGroup">
                <MainMenuBar page={"Code"} />
                <CommunitySearchBar
                    secondTag={"코드 유형"}
                    language={language}
                    setLanguage={setLanguage}
                    reference={reference}
                    setReference={setReference}
                    setKeyword={setKeyword}
                    searchKeyword={searchKeyword}
                    setSearchIsOn={setSearchIsOn}
                    searchIsOn={searchIsOn}
                    setCurrentPage={setCurrentPage}
                />
                <LoadingSpinner color={"#FF6B00"} comment={"코드 정보 불러오는 중"} />
            </div>
        );
    }

    console.log(searchResult);

    return (
        <div id="Codehome">
            <MainMenuBar page={"Code"} />
            <CommunitySearchBar
                secondTag={"코드 유형"}
                language={language}
                setLanguage={setLanguage}
                reference={reference}
                setReference={setReference}
                setKeyword={setKeyword}
                searchKeyword={searchKeyword}
                setSearchIsOn={setSearchIsOn}
                searchIsOn={searchIsOn}
                setCurrentPage={setCurrentPage}
            />
            <CodeSearchResult searchData={searchResult.content} bodyHeight={"50vh"} siteTag={"Code"} />
            <div id="pagination">
                <button id='paginationBtn' onClick={handlePreviousPage} disabled={currentPage === 0}>{"<"}</button>
                <span id='paginationTxt'> {currentPage + 1} / {searchResult.totalPages}</span>
                <button id='paginationBtn' onClick={handleNextPage} disabled={currentPage >= searchResult.totalPages - 1}>{">"}</button>
            </div>
            <CodeHomeUploadButton />
        </div>
    );
}

export default CodeCommunity;
