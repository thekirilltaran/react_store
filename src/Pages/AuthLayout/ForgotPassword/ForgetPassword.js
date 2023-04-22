import { Layout, Typography } from "antd";
import React from "react";
import "assets/scss/auth.scss";
import FormResetPass from 'components/Forms/ResetPassword'

const { Title, Text } = Typography;

export default function ForgotPassword() {
    return (
        <Layout>
            <div className="container">
                <div className="auth-form">
                    <Title>Reset password</Title>
                    <Text>Enter your email address to reset your password</Text>
                    <FormResetPass/>
                </div>
            </div>
        </Layout>
    )
}