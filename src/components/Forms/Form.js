import {useState} from 'react';

import {Space, Layout, Typography, Button, Input, Form, Checkbox } from 'antd';
import {
    GoogleOutlined,
    FacebookOutlined
} from '@ant-design/icons';

const { Title } = Typography;



const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const FormBasic = ({title, handleClick, handleClickGoogle, handleClickFacebook}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    return (
        <Layout>
                <Title level={2}>{title}</Title>
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
                            <Button type="primary" htmlType="submit"  onClick={() => handleClick(email, pass)}>{title}</Button>
                            <Button type="default"  htmlType="button" onClick={(e) => handleClickGoogle(e)}>{title} google <GoogleOutlined /></Button>
                            <Button type="primary"  htmlType="button" onClick={(e) => handleClickFacebook(e)}>{title} Facebook <FacebookOutlined /></Button>
                        </Space>
                    </Form.Item>
                </Form>
        </Layout>
    )
}

export {FormBasic}
