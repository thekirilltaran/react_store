import React, { useState, useEffect } from "react";
import { Col, Layout, Menu, Row, Switch, Select, Button } from "antd";
import { MenuOutlined, UserOutlined, ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import useLocale from "hooks/useLocale";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { useAuth } from "hooks/useAuth";
import { auth } from "apis/fiebase";
import { cartCountSelector } from 'reducers/cartReducer/cartReducer'


import './styles.scss';

import {
    Menu_link,
    Menu_link2,
    Menu_link3,
    Menu_link4
} from "i18n/Header/header";



const {Header} = Layout;

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

const language = [
    { value: 'en', label: 'En' },
    { value: 'ru', label: 'Ru' },
    { value: 'ua', label: 'Ua' },
    { value: 'de', label: 'De' },
]

export default function HeaderC () {
    const [theme, setTheme] = useState('dark');
    const { setLocale } = useLocale();
    const cartCount = useSelector(cartCountSelector);
    const {isAuth} = useAuth();



    useEffect(()=> {
        const user = auth.currentUser;
        if(user != null) {
            console.log(user.email)
        }
    },[])

    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };

    const handleChangeLocale = (value) => {
        setLocale(value);
    };
    return <Header className="header">
                <div className="container">
                    <Row gutter={30} align="middle">
                        <Col className="gutter-row" align="middle" span={6}>
                            <Logo/>
                        </Col>
                        <Col className="gutter-row" span={18}>
                            <div className="action">
                                <Menu
                                    className="menu"
                                    overflowedIndicator={<MenuOutlined />}
                                    mode="horizontal"
                                    items={items} />
                                <Switch
                                    checked={theme === 'dark'}
                                    onChange={changeTheme}
                                    checkedChildren="Dark"
                                    unCheckedChildren="Light"
                                />
                                <Select
                                    className="select-header"
                                    onChange={handleChangeLocale}
                                    defaultValue="en"
                                    options={language}
                                    bordered={false}
                                />
                                {!isAuth ?
                                    <Link type="primary"
                                          to="/login"
                                          shape="circle"
                                          size="small"
                                          style={{"fontSize": "25px",
                                              color: "#161616",
                                              display: 'block',
                                              marginLeft: "20px"}}>
                                        <UserOutlined />
                                    </Link>
                                :
                                    <Link type="primary"
                                          to="/profile"
                                          shape="circle"
                                          size="small"
                                          style={{"fontSize": "25px",
                                              color: "#161616",
                                              display: 'block',
                                              marginLeft: "20px"}}>
                                        <UserOutlined />
                                    </Link>

                                }
                                <Link to="/favorites" className="btn-fav"
                                    size="large">
                                    <HeartOutlined />
                                </Link>

                                <Link to="/cart"
                                      type="primary"
                                      shape="circle"
                                      size="small"
                                      className="cart-count"
                                      style={{"fontSize": "25px",
                                          color: "#161616",
                                          display: 'block',
                                          marginLeft: "20px"}}>
                                    <ShoppingCartOutlined />
                                    <span className="value">{cartCount}</span>
                                </Link>
                                <SearchBar/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Header>
}