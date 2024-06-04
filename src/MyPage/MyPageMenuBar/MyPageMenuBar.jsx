import React from "react";
import './MyPageMenuBar.css';
import { useNavigate } from 'react-router-dom';

function MyPageMenuBar({ MyPage }) {
    const navigator = useNavigate();
    return (
        <div>
            <div id="MyPageMenuBar">
                <button 
                    className={`menu-button ${MyPage === "1" ? "active" : ""}`} 
                    onClick={() => navigator('/mypage/')}
                >
                    내 정보
                </button>
                <span>|</span>
                <button 
                    className={`menu-button ${MyPage === "2" ? "active" : ""}`} 
                    onClick={() => navigator('/mypage/MyCodeBoard')}
                >
                    내 코드 보드 관리
                </button>
                <span>|</span>
                <button 
                    className={`menu-button ${MyPage === "3" ? "active" : ""}`} 
                    onClick={() => navigator('/mypage/MyCodeGroup')}
                >
                    내 코드 그룹 관리
                </button>
                <span>|</span>
                <button 
                    className={`menu-button ${MyPage === "4" ? "active" : ""}`} 
                    onClick={() => navigator('/mypage/MyUploadCode')}
                >
                    내가 작성한 코드 관리
                </button>
                <span>|</span>
                <button 
                    className={`menu-button ${MyPage === "5" ? "active" : ""}`} 
                    onClick={() => navigator('/mypage/NewCode')}
                >
                    새로운 코드 업로드
                </button>
            </div>
        </div>
    );
}

export default MyPageMenuBar;
