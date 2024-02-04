import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const MemberDeleteForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(`/api/members/getMemberId/${id}`);
            } catch (error) {
                console.error('Failed to fetch member information:', error);
            }
        };

        fetchMemberData();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('정말로 회원을 탈퇴하시겠습니까?')) {
            try {
                await axios.delete(`/api/members/deleteMember/${id}`);
                alert('Your account has been deleted.');
                navigate('/login');
            } catch (error) {
                console.error('회원 정보 삭제에 실패했습니다.:', error);
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-5">회원 탈퇴</h2>
            <div className="space-y-4">
                <p className="text-red-500">
                    회원을 탈퇴하시면 정보가 영구적으로 삭제되며 돌이킬 수 없습니다. 회원을 탈퇴하시겠습니까?
                </p>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >회원 탈퇴
                </button>
            </div>
        </div>
    );
};

export default MemberDeleteForm;