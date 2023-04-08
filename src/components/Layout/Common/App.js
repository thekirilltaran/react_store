import {useState} from "react";
import StoreFront from "./../../StoreFront/StoreFront";
import './App.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    if (!loggedIn) {
        return <>
            <h2>Please login</h2>
            <button className="btn btn-primary" onClick={() => setLoggedIn(true)}>Login</button>
        </>
    } else {
        return <>
            <StoreFront/>
            <button className="btn btn-outline" onClick={() => setLoggedIn(false)}>Logout</button>
        </>
    }
}

export default App;
