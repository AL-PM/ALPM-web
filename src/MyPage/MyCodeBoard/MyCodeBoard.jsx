import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar";
import MyPageMenuBar from "../MyPageMenuBar/MyPageMenuBar";
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner';

function MyCodeBoard(){
    const [searchResult, setSearchResult] = useState();
    const [currentPage, setCurrentPage] = useState(0); // Current page state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const uid = localStorage.getItem("uid");

                const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm/user/${uid}`, {
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

        fetchUserData();

    }, [currentPage]);

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
                <MainMenuBar page={"MyPage"} />
                <MyPageMenuBar MyPage={"2"}/>
                <LoadingSpinner color={"#EF4949"} comment={"내 코드 보드 불러오는 중"}/>
            </div>
        );
    }

    console.log(searchResult);

    return(
        <div id="MyCodeBoard">
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"2"}/>
            <CodeSearchResult searchData={searchResult.content} bodyHeight={"55vh"} siteTag={"MyPage"}/>
            <div id="pagination">
                <button id='paginationBtn' onClick={handlePreviousPage} disabled={currentPage === 0}>{"<"}</button>
                <span id='paginationTxt'> {currentPage + 1} / {searchResult.totalPages}</span>
                <button id='paginationBtn' onClick={handleNextPage} disabled={currentPage >= searchResult.totalPages - 1}>{">"}</button>
            </div>
        </div>
    )
}

export default MyCodeBoard;