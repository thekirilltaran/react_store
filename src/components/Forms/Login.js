import useMessages from "hooks/useMessages";
import {useDispatch} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    updateProfile, RecaptchaVerifier
} from "firebase/auth";
import {setUser} from 'reducers/usersReducer/userReducer';
import {auth} from 'apis/fiebase'
import {useState} from "react";
import { Button, Input, Space, Form, Checkbox } from "antd";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { collection, addDoc } from "firebase/firestore";

function FormLogIn() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [remember, setRemember] = useState(JSON.parse(localStorage.getItem("userAuth")) ?? null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {showMess, contextHolder} = useMessages();
    const provider = new GoogleAuthProvider();


    const handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                const userAuth = {
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }
                setRemember(user);
                // localStorage.setItem("userAuth", JSON.stringify(userAuth));
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                navigate('/profile');
            })
            .catch((error) => {
                console.log(error);
                showMess("error", error.message)
            })
    }

    const handleLoginGoogle = (e)=> {
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
                navigate('/profile');
            }).catch((error) => {
                console.log(error)
                showMess("error", error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    const handleLoginFacebook = (e)=> {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                const user = result.user;
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                navigate('/profile');
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
                    <Input type="text"
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
                        <Button type="primary" htmlType="submit"  onClick={() => handleLogin(email, pass)}>Log in</Button>
                        <Button type="default"  htmlType="button" onClick={(e) => handleLoginGoogle(e)}>Log in google <GoogleOutlined /></Button>
                        <Button type="primary"  htmlType="button" onClick={(e) => handleLoginFacebook(e)}>Log in Facebook <FacebookOutlined /></Button>
                    </Space>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <div className="action-form">
                        <p>Forgot password? <Link to="/reset_password">Reset password</Link></p>
                        <p>Not a member? <Link to="/sign_up">Sign up</Link></p>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}

export default FormLogIn;