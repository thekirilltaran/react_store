import { Layout, Typography } from "antd";
import React from "react";
import FormSignUp from "components/Forms/SignUp";

const { Title } = Typography;

export default function SignUp() {
    return (
        <Layout>
            <div className="container">
                <div className="auth-form">
                    <Title>Sign up</Title>
                    <FormSignUp/>
                </div>
            </div>
        </Layout>
    )
}