import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CodeGroupHome.css";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx";
import CommunitySearchBar from "../../Etc/CommunitySearchBar/CommunitySearchBar.jsx";
import CodeGroupSearchResult from "../../Etc/CodeGroupSearchResult/CodeGroupSearchResult.jsx";
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner.jsx';

function CodeGrupHome() {
    const [language, setLanguage] = useState("PYTHON");
    const [reference, setReference] = useState(null);
    const [searchKeyword, setKeyword] = useState("");
    const [searchResult, setSearchResult] = useState();
    const [currentPage, setCurrentPage] = useState(0); // Current page state
    const [searchIsOn, setSearchIsOn] = useState(false);

    useEffect(() => {
        const fetchSearchGroup = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const response = await axios.get(`https://alpm.duckdns.org:8080/codeGroup/search`, {
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

        const fetchTotalGroup = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const response = await axios.get(`https://alpm.duckdns.org:8080/codeGroup`, {
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
            fetchSearchGroup();
        } else {
            fetchTotalGroup();
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
                <MainMenuBar page={"CodeGroup"} />
                <CommunitySearchBar
                    secondTag={"제작자 유형"}
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
                <LoadingSpinner color={"#009418"} comment={"코드 그룹 정보 불러오는 중"} />
            </div>
        );
    }

    console.log(searchResult);

    return (
        <div id="CodeGroupHome">
            <MainMenuBar page={"CodeGroup"} />
            <CommunitySearchBar
                secondTag={"제작자 유형"}
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
            <CodeGroupSearchResult searchData={searchResult.content} bodyHeight={"60vh"} />
            <div id="pagination">
                <button id='paginationBtn' onClick={handlePreviousPage} disabled={currentPage === 0}>{"<"}</button>
                <span id='paginationTxt'> {currentPage + 1} / {searchResult.totalPages}</span>
                <button id='paginationBtn' onClick={handleNextPage} disabled={currentPage >= searchResult.totalPages - 1}>{">"}</button>
            </div>
        </div>
    );
}

export default CodeGrupHome;
