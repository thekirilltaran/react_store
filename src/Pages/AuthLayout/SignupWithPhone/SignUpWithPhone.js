import { Layout, Typography } from "antd";
import React from "react";
import FormSignUp from "components/Forms/SignUpWithNumber";

const { Title } = Typography;

export default function SignUpWithPhone() {
    return (
        <Layout>
            <div className="container">
                <div className="auth-form">
                    <Title>Sign up With Number</Title>
                    <FormSignUp/>
                </div>
            </div>
        </Layout>
    )
}