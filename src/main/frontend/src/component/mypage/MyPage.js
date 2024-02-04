import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const [userData, setUserData] = useState({});
    const authToken = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!authToken) {
                    navigate('/login');
                } else {
                    const response = await axios.get('http://localhost:8080/api/member/me', {
                        headers: { Authorization: `Bearer ${authToken}` },
                    });
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('사용자 정보 불러오기 실패', error);
            }
        };

        fetchData();
    }, [authToken, navigate]);

    const navigateToMyPosts = () => {
        navigate('/mypage/my-posts');
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
                <p className="text-gray-600"><span className="font-bold text-gray-900">사용자 이름:</span> {userData.name}</p>
                <p className="text-gray-600"><span className="font-bold text-gray-900">이메일:</span> {userData.email}</p>
            </div>
            <div className="flex flex-wrap gap-4">
                <button onClick={navigateToMyPosts} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">내가 쓴 글</button>
                <button onClick={navigateToEditProfile} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">회원정보 수정</button>
                <button onClick={navigateToDeleteProfile} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">회원 탈퇴</button>
            </div>
        </div>
    );
};

export default MyPage;