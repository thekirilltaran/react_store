import { Login } from "components/Forms/Login"
import { SignUp } from "components/Forms/SignUp"

import { useDispatch } from "react-redux";
import {removeUser} from 'reducers/usersReducer/userReducer';

import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "hooks/useAuth";

import { Col, Row, Button, Typography } from 'antd';
import React from "react";


const { Title } = Typography;



export default function Profile() {
    const {isAuth, email} = useAuth();
    const dispatch = useDispatch();
    const auth = getAuth();
    const user = auth.currentUser;

    function signOutUser () {
        signOut(auth).then((data) => {
            dispatch(removeUser())
        }).catch((error) => console.log(error));
    }

    return (<div className="container">
                    {!isAuth ?
                        <>
                            <Title>Please login or sign up</Title>
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Login/>
                                </Col>
                                <Col span={12}>
                                    <SignUp/>
                                </Col>
                            </Row>
                        </>
                    :
                        <>
                            <Title>Profile</Title>
                            <h4>{user && user.displayName}</h4>
                            <img src={user && auth.currentUser.photoURL} alt=""/>
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Button type="default" onClick={() => signOutUser()}>Log out from {email}</Button>
                                </Col>
                            </Row>
                        </>}

                </div>)
}