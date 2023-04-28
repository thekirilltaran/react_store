import {useDispatch, useSelector} from "react-redux";
import {removeUser} from 'reducers/usersReducer/userReducer';
import { useNavigate } from 'react-router-dom';
import { signOut} from "firebase/auth";
import { auth, db } from "apis/fiebase";
import { doc, getDoc } from "firebase/firestore";
import { Col, Row, Button, Typography, Spin, Avatar, Layout } from 'antd';
import React, {useState, useEffect} from "react";
import { useAuth } from "hooks/useAuth";
import "./profile.scss"

const { Title } = Typography;

export default function Profile() {
    const {email, id, loading, emailVerified} = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [infoUser, setInfoUser] = useState({});

    async function getUser() {
        await getDoc(doc(db, "users", id)).then(response => {
            setInfoUser(response.data())
        })
    }

    useEffect(()=> {
        if(loading && id) {getUser()}
    }, [email, id])

    function signOutUser () {
        signOut(auth)
        .then((data) => {
            dispatch(removeUser())
            navigate('/');
        }).catch((error) => console.log(error));
    }

    return (<Layout className="section section-profile">
        <div className="recaptcha-container" id="recaptcha-container"></div>
                <div className="container">
                        <Title style={{marginTop: 0}}>Profile</Title>
                            {loading && <Spin/>}
                            {!loading &&
                            <>
                                <Row>
                                    <Col className="gutter-row" span={6}>
                                        {infoUser?.avatar ?
                                            <Avatar className="user-avatar" src={infoUser?.avatar} />
                                        :
                                            <Avatar className="user-avatar">
                                                {infoUser?.fullName && infoUser?.fullName[0]}
                                            </Avatar>}

                                    </Col>
                                    <Col className="gutter-row" span={18}>
                                        <ul className="list-info">
                                            <li>
                                                <strong>Full name</strong>:  {infoUser && infoUser?.fullName}
                                            </li>
                                            <li>
                                                <strong>Birthday</strong>: {infoUser && infoUser?.birthday}
                                            </li>
                                            <li>
                                                <strong>Phone</strong>: {infoUser && infoUser?.phone}
                                            </li>
                                            <li>
                                                <strong>Gender</strong>: {infoUser && infoUser?.gender}
                                            </li>
                                            <li>
                                                <strong>Language</strong>: {infoUser && infoUser?.language}
                                            </li>
                                            <li>
                                                <strong>Email {emailVerified ? '(Верифицырован)' : '(Не Верифицырован)'}</strong>:  {email}
                                            </li>
                                        </ul>
                                        <Button type="default" onClick={() => signOutUser()}>Log out from {email}</Button>
                                    </Col>
                                </Row>
                            </>
                            }
                 </div>
        </Layout>)
}