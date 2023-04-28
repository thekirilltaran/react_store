import useMessages from "hooks/useMessages";
import {useNavigate, Link} from 'react-router-dom';
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from 'apis/fiebase'
import {useState} from "react";
import { Button, Input, Space, Form, Checkbox } from "antd";


export default function FormResetPass() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {showMess, contextHolder} = useMessages();

    const handleResetPassword = (email, password) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
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

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit"  onClick={() => handleResetPassword(email)}>Log in</Button>
                    </Space>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <div className="action-form">
                        <p>Have account? <Link to="/login">Log in</Link></p>
                        <p>Not a member? <Link to="/sign_up">Sign up</Link></p>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}