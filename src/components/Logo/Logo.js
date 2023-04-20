import logo from "../../assets/images/logo.svg";

export default function Logo() {
    return (
        <a href="/" style={{display:"flex", width: '100%'}}>
            <img src={logo}/>
        </a>
    )
}