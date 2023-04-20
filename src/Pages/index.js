import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import About from "./About/About";
import Profile from "./Profile/Profile";
import Products from "./Products/Products";
import Page404 from "./404/PageNotFound";
import { Layout } from "antd";
const {Content } = Layout;


export default function ContentC() {
    return <Content>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/cart" element={<Cart/>}></Route>
                        <Route path="/about" element={<About/>}></Route>
                        <Route path="/profile" element={<Profile/>}></Route>
                        <Route path="/products" element={<Products/>}></Route>
                        <Route path="*" element={<Page404/>}></Route>
                    </Routes>
            </Content>
}