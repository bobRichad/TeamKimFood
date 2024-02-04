import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/Common.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { SlLogin, SlLogout , SlPencil, SlSettings, SlWrench } from "react-icons/sl";
import { BsFillQuestionCircleFill } from "react-icons/bs";

import { useNavigate } from 'react-router-dom';

//JWT 디코딩
function TopNav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );

            return JSON.parse(jsonPayload);

        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                const isAdmin = decodedToken.role === 'ADMIN';
                setIsLoggedIn(true);
                setIsAdmin(isAdmin);
            } else {
                // 토큰 디코딩에 실패한 경우 처리
                console.error('Token decoding failed.');
            }
        }
    }, []);

    //로그인
    const handleLogin = (loginCredentials) => {
        console.log('ok');
        axios.post('/login', loginCredentials)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
                setIsAdmin(response.data.isAdmin === 'true');
                console.log('응답 확인', response.data);
                // 로그인 후 처리
                handleAdminOrMyPageClick();
            })
            .catch(error => {
                console.log('에러 발생');
            });
    };

    //로그아웃
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsAdmin(false);
        //로그아웃 후 홈페이지로 이동
        navigate('/');
    };

    //로그인 후 처리
    const handleAdminOrMyPageClick = () => {
        console.log('로그인 user', isAdmin)
        if (isAdmin) {
            console.log('관리자 페이지 이동 완료')
            navigate('/admin');
        } else {
            console.log('마이 페이지로 이동 완료')
            navigate('/mypage');
        }
    };

    //로그인 버튼 클릭 시 호출될 함수
    const handleLoginClick = () => {
        const loginCredentials = {
            username: 'username',
            password: 'password',
        };
        handleLogin(loginCredentials);
    };

    // 화면 크기에 따라 네비게이션 바 상태를 조절하는 로직 추가
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 750) {
                setIsNavExpanded(false); // 화면이 넓으면 네비게이션 바 축소
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isNavExpanded, setIsNavExpanded] = useState(false); // 네비게이션 확장 상태 추가

    const toggleNav = () => {
        console.log("Before toggle:", isNavExpanded);
        setIsNavExpanded(!isNavExpanded);
        console.log("After toggle:", isNavExpanded);
    };


    return (
        <header>
            <div className="hd_top flex items-center justify-between">
                <span className="logo"><a href="/">YoriJori</a></span>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button className="btn_regular" variant="outline-success">Search</Button>
                </Form>
                <ul className="signInUp flex items-center space-x-4">
                    {!isLoggedIn ? (
                        <>
                            <li><a href="/signin"><span className="SlPencil"><SlPencil/></span>회원가입</a></li>
                            <li><a href="/login"><span className="SlLogin"><SlLogin/></span>로그인</a></li>
                            <li><a href="/survey"><span className="Survey"><BsFillQuestionCircleFill/></span>설문조사</a></li>
                        </>
                    ) : (
                        <>
                            {isAdmin ? (
                                <li><a onClick={handleAdminOrMyPageClick}>
                                    <span className="SlWrench"><SlWrench/><span className="SlWrench"/></span>관리자 페이지</a>
                                </li>
                            ) : (
                                <li><a href="/mypage" onClick={handleAdminOrMyPageClick}>
                                    <span className="SlSettings"><SlSettings/></span>마이 페이지</a></li>
                            )}
                            <li><a href="/main" onClick={handleLogout}>
                                <span className="SlLogout"><SlLogout/></span>로그아웃</a></li>
                            <li><a href="/survey"><span className="Survey"><BsFillQuestionCircleFill/></span>설문조사</a>
                            </li>
                        </>
                    )}
                </ul>
                <div className="small-nav" onClick={toggleNav}>
                    <img src="/menu-icon.png" className="menu-icon" alt="Menu Icon"/>
                </div>
            </div>

            <Navbar expand="lg" className={`navbar ${isNavExpanded ? "expanded" : ""}`}>
                <Container fluid="true" id="contNav">

                    <ul className="navbar-nav">
                        <li className="depth-1 navbar-text"><a href="#">오늘의 요리</a></li>
                        <li className="depth-1 navbar-text"><a href="#">인기 레시피</a></li>
                        <li className="depth-1 navbar-text"><a href="#">매거진</a></li>
                    </ul>

                </Container>
            </Navbar>

        </header>
    );
}

export default TopNav;