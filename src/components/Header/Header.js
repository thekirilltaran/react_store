import { useState } from "react";
import StoreFront from "../StoreFront/StoreFront";


function Header () {
    const [loggedIn, setLoggedIn] = useState(false);

    return <header>
        <p style={{textAlign: "center"}}>Header</p>
        {!loggedIn &&
            <>
                <h2>Please login</h2>
                <button className="btn btn-primary" onClick={() => setLoggedIn(true)}>Login</button>
            </>
        }
        {loggedIn &&
            <>
                <StoreFront/>
                <button className="btn btn-outline" onClick={() => setLoggedIn(false)}>Logout</button>
            </>
        }
    </header>;
}

export default Header;