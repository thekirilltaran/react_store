import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "Pages/AuthLayout/Login/Login";
import SignUp from "Pages/AuthLayout/SignUp/SignUp";
import ForgotPassword from "Pages/AuthLayout/ForgotPassword/ForgetPassword";
import Cart from "./Cart/Cart";
import Favorites from "./Favorites/Favorites";
import About from "./About/About";
import Profile from "./Profile/Profile";
import Products from "./Products/Products";
import Page404 from "./404/PageNotFound";
import { Layout } from "antd";
import { useAuth } from "hooks/useAuth";
import React from "react";
import Spinner from "components/Spinner/Spinner";
import SignUpWithPhone from "./AuthLayout/SignupWithPhone/SignUpWithPhone";

const {Content } = Layout;


export default function ContentC() {
    const {isAuth, loading} = useAuth();
    return (<Content>
                    {loading && <Spinner/>}
                    {!loading &&
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/sign_up" element={<SignUp/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/signup_phone" element={<SignUpWithPhone/>}></Route>
                        <Route path="/profile" element={<Profile/>}></Route>


                        <Route path="/reset_password" element={<ForgotPassword/>}></Route>
                        <Route path="/cart" element={<Cart/>}></Route>
                        <Route path="/favorites" element={<Favorites/>}></Route>
                        <Route path="/about" element={<About/>}></Route>

                        <Route path="/products" element={<Products/>}></Route>
                        <Route path="*" element={<Page404/>}></Route>
                    </Routes>}
            </Content>)
}