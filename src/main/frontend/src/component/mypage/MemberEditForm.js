import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const MemberEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [memberData, setMemberData] = useState({
        name: '',
        email: '',
        nickname: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(`/api/members/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setMemberData(response.data);
            } catch (error) {
                console.error('회원 정보를 불러오지 못했습니다.', error);
            }
        };

        fetchMemberData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/members/${id}`, memberData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('회원 정보가 업데이트되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.error('회원 정보 업데이트 실패', error);
            alert('회원 정보 업데이트에 실패했습니다.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMemberData({ ...memberData, [name]: value });
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-5">회원정보 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                    <input type="text" name="name" id="name" value={memberData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                    <input type="email" name="email" id="email" value={memberData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">닉네임</label>
                    <input type="text" name="nickname" id="nickname" value={memberData.nickname} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">전화번호</label>
                    <input type="text" name="phoneNumber" id="phoneNumber" value={memberData.phoneNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">회원정보 수정</button>
            </form>
        </div>
    );
};

export default MemberEditForm;