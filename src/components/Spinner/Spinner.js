import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

export default function Spinner() {
    return <Spin
        indicator={<LoadingOutlined
            style={{
                fontSize: 50,
            }}spin/>}
        className="spinner"/>
}