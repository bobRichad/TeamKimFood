import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const MemberEditForm = () => {
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

    const handleChange = (e) => {
        setMemberData({ ...memberData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/members/${id}`, memberData);
            alert('회원 정보가 수정되었습니다.');
            navigate('/'); // 성공적으로 수정 후 리다이렉션
        } catch (error) {
            console.error('Failed to update member', error);
            setErrorMessage('회원 정보가 수정되지 않았습니다.');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-5">회원 정보 수정</h2>
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
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                    >
                        회원 정보 수정
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MemberEditForm;