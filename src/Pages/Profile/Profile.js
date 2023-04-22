import {useDispatch} from "react-redux";
import {removeUser} from 'reducers/usersReducer/userReducer';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "apis/fiebase";

import { Col, Row, Button, Typography } from 'antd';
import React from "react";
import { useAuth } from "hooks/useAuth";

const { Title } = Typography;

export default function Profile() {
    const {email} = useAuth();
    const dispatch = useDispatch();
    const user = auth.currentUser;
    const navigate = useNavigate();

    console.log(auth)
    function signOutUser () {
        signOut(auth)
        .then((data) => {
            console.log(1)
            dispatch(removeUser())
            navigate('/');
        }).catch((error) => console.log(error));
    }

    return (<div className="container">
                    <Title>Profile</Title>
                    <h4>{user && user.displayName}</h4>
                    <img src={user && auth.currentUser.photoURL} alt=""/>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Button type="default" onClick={() => signOutUser()}>Log out from {email}</Button>
                        </Col>
                    </Row>
             </div>)
}