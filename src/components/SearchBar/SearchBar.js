import React, { useState } from 'react';
import { Button, Modal, Input, Space } from 'antd';
import { SearchOutlined, AudioOutlined } from "@ant-design/icons";

const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
const onSearch = (value) => console.log(value);

export default function SearchBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
                    size="small"
                    style={{
                        fontSize: "24px",
                        background: "transparent",
                        color: "#161616",
                        display: 'flex',
                        marginLeft: "20px"}}
                    onClick={showModal}>
            </Button>
            <Modal open={isModalOpen} onCancel={handleCancel} footer  closable={false} mask={true} maskClosable={true}>
                <Space direction="vertical" style={{width: '100%'}}>
                    <Search
                        style={{width: '100%'}}
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        suffix={suffix}
                        onSearch={onSearch}
                    />
                </Space>
            </Modal>
        </>
    )
}