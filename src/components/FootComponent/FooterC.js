import React from "react";
import { Layout, Menu, Col, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import './styles.scss';
import Socials from "../Socials/Socials";
import { FormattedMessage } from "react-intl";
import { Menu_link, Menu_link2, Menu_link3, Menu_link4 } from "../../i18n/Header/header";

const {Footer} = Layout;

const items = [
    {
        label: (
            <NavLink to="/"><FormattedMessage id={Menu_link.key} /></NavLink>
        ),
        key: 'home',
    },
    {
        label: (
            <NavLink to="/products"><FormattedMessage id={Menu_link2.key} /></NavLink>
        ),
        key: 'products',
    },
    {
        label: (
            <NavLink to="/about"><FormattedMessage id={Menu_link3.key} /></NavLink>
        ),
        key: 'about',
    },
    {
        label: (
            <NavLink to="/cart"><FormattedMessage id={Menu_link4.key} /></NavLink>
        ),
        key: 'cart',
    },
];

export default function FooterC() {
    return <Footer className="footer">
                <div className="foot">
                        <div className="container">
                            <Row gutter={30} align="middle" className="action">
                                    <Col className="gutter-row" align="middle" span={12}>
                                        <Menu
                                            className="menu"
                                            overflowedIndicator={<MenuOutlined />}
                                            mode="horizontal"
                                            items={items} />
                                    </Col>
                                    <Col className="gutter-row" align="middle"style={{display: 'flex', justifyContent: 'flex-end'}} span={12}>
                                        <Socials/>
                                    </Col>
                                </Row>
                            <div className="copyright">© 2023 Kirill Taran. All rights reserved.</div>
                        </div>
                </div>
            </Footer>
}