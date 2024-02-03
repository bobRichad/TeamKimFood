import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const MemberDeleteForm = () => {
    const { id } = useParams(); // URL에서 id 파라미터를 가져옵니다.
    const navigate = useNavigate();
    const [memberData, setMemberData] = useState({
        name: '',
        email: '',
        nickname: '',
        phoneNumber: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(`/api/members/${id}`);
                setMemberData(response.data);
            } catch (error) {
                console.error('회원 정보를 불러오지 못했습니다.', error);
                setErrorMessage('회원 정보를 불러오지 못했습니다.');
            }
        };

        fetchMemberData();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('정말로 회원을 탈퇴하시겠습니까?')) {
            try {
                await axios.delete(`/api/members/${id}`);
                alert('회원을 탈퇴하셨습니다.');
                navigate('/login'); // 계정 삭제 후 로그인 페이지로 리다이렉션
            } catch (error) {
                console.error('회원 탈퇴에 실패했습니다.', error);
                setErrorMessage('회원 탈퇴에 실패했습니다.');
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-5">회원 정보 탈퇴</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields */}
                <div>
                    <label className="block text-gray-700">이름:</label>
                    <input
                        type="text"
                        name="name"
                        value={memberData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={memberData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">닉네임:</label>
                    <input
                        type="text"
                        name="nickname"
                        value={memberData.nickname}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">전화번호:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={memberData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Submit button */}
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                    >
                        회원 탈퇴
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MemberDeleteForm;