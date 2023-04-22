import {useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import {getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    sendEmailVerification} from "firebase/auth";
import {setUser} from 'reducers/usersReducer/userReducer';
import useMessages from "hooks/useMessages";
import { Button, Input, Space, Form, Checkbox } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function FormSignUp() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const {showMess, contextHolder} = useMessages();
    const auth = getAuth();

    const handleRegister = async (email, password) => {
       createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                sendEmailVerification(user)
                // navigation('/');
            })
            .catch((error) => {
                console.log(error)
                showMess("error", error.message)
            })

    }

    const handleRegisterGoogle = (e)=> {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                sendEmailVerification(user)
            }).catch((error) => {
            console.log(error)
            showMess("error", error.message)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const handleRegisterFacebook = (e)=> {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                sendEmailVerification(user)
            })
            .catch((error) => {
                console.log(error)
                showMess("error", error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
            });
    }

    return (<>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input type="email"
                           value={email}
                           placeholder="Email"
                           onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password type="password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    placeholder="password"/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit"  onClick={() => handleRegister(email, pass)}>Sign Up</Button>
                        <Button type="default"  htmlType="button" onClick={(e) => handleRegisterGoogle(e)}>Sign Up google <GoogleOutlined /></Button>
                        <Button type="primary"  htmlType="button" onClick={(e) => handleRegisterFacebook(e)}>Sign Up Facebook <FacebookOutlined /></Button>
                    </Space>
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <div className="action-form">
                        <p>Have account? <Link to="/login">Log in</Link></p>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}