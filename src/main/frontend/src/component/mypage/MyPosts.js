import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyPosts() {
    const [posts, setPosts] = useState([]); // 사용자의 글 목록을 저장할 상태
    const userId = 1; // 사용자 ID, 실제로는 동적으로 받아와야 합니다.

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`/api/members/${userId}/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('사용자 글 조회 중 오류 발생:', error);
        }
    };

    const deletePost = async (postId) => {
        try {
            await axios.delete(`/api/members/${userId}/posts/${postId}`);
            alert('글이 삭제되었습니다.');
            // 삭제 후 추가적인 로직 실행, 예: 목록 새로고침
        } catch (error) {
            console.error('글 삭제 중 오류 발생:', error);
        }
    };

    return (
        <div>
            <h2>내가 쓴 글 목록</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {post.title}
                        <button onClick={() => deletePost(post.id)}>글 삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyPosts;