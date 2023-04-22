import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/" style={{display:"flex", width: '100%'}}><img src={logo}/></Link>
    )
}