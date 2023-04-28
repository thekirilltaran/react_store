import {useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import {getAuth, signInWithPhoneNumber, RecaptchaVerifier} from "firebase/auth";
import useMessages from "hooks/useMessages";
import {setUser} from 'reducers/usersReducer/userReducer';
import { Button, Input, Space, Form, Checkbox } from "antd";
import { useState } from "react";

export default function FormSignUpPhone() {
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {showMess, contextHolder} = useMessages();
    const auth = getAuth();


    function onCaptchVerify() {
        console.log(phone)
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('container-verifier', {
                'size': 'invisible',
                'callback': (code) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            }, auth);
        }
    }

    const handleRegister = async () => {
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        // const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);


        signInWithPhoneNumber(auth, "+380 50 911 9469", appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult)
            }).catch((error) => {
                console.log(error)
            // Error; SMS not sent
            // ...
        });
    }

    function handleCode() {
        console.log(otp)
        if(otp.length == 6) {

            window.confirmationResult.confirm(otp).then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log(user)
                dispatch(setUser({
                    email: user.phoneNumber,
                    id: user.uid,
                    token: user.accessToken,
                }));
                console.log(user)
                // sendEmailVerification(user)
                // navigate('/profile');
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
            });
        }
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
                    label="Your phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input type="number"
                           value={phone}
                           placeholder="Your phone number"
                           onChange={(e) => setPhone(e.target.value)}/>
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

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Space>
                        <div className="container-verifier" id="container-verifier"></div>
                        <Button type="primary" htmlType="submit"  onClick={() => handleRegister()}>Sign Up with number</Button>
                    </Space>
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <div className="action-form">
                        <p>Have account? <Link to="/login">Log in</Link></p>
                    </div>
                </Form.Item>
            </Form>
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
                    label="Your phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input type="number"
                           value={otp}
                           placeholder="Your phone number"
                           onChange={(e) => setOtp(e.target.value)}/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Space>
                        <div className="container-verifier" id="container-verifier"></div>
                        <Button type="primary" htmlType="submit"  onClick={() => handleCode()}>Send code</Button>
                    </Space>
                </Form.Item>

            </Form>
        </>
    )
}