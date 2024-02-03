import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MyPage = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',

    });
    const navigate = useNavigate();

    // 사용자 정보를 불러오는 함수
    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error("회원 정보 조회 실패:", error);
            // 오류 처리, 예를 들어 로그인 페이지로 리다이렉션
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navigateToEditProfile = () => {
        navigate('/mypage/edit-profile');
    };

    const navigateToDeleteProfile = () => {
        navigate('/mypage/delete-profile');
    };

    return (
        <div className="container mx-auto my-10 p-5 rounded shadow-lg bg-white">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">마이 페이지</h2>
            <div className="mb-6">
                <p className="text-gray-600"><span className="font-bold text-gray-900">사용자 이름:</span> {userData.username}</p>
                <p className="text-gray-600"><span className="font-bold text-gray-900">이메일:</span> {userData.email}</p>
                {/* 필요에 따라 더 많은 사용자 정보를 여기에 표시 */}
            </div>
            <div className="flex flex-wrap gap-4">
                <button onClick={() => navigate('/my-posts')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">내가 쓴 글</button>
                <button onClick={navigateToEditProfile} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">회원정보 수정</button>
                <button onClick={navigateToDeleteProfile} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">회원 탈퇴</button>
                <button onClick={handleLogout} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300">로그아웃</button>
            </div>
        </div>
    );
};

export default MyPage;