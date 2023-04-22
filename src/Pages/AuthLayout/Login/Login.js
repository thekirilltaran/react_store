import { Layout, Typography } from "antd";
import React from "react";
import FormLogIn from "components/Forms/Login";
import "assets/scss/auth.scss";

const { Title } = Typography;

export default function Login() {
    return (
        <Layout>
            <div className="container">
                <div className="auth-form">
                    <Title>Login</Title>
                    <FormLogIn/>
                </div>
            </div>
        </Layout>
    )
}