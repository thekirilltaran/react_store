import useMessages from "hooks/useMessages";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    updateProfile} from "firebase/auth";
import {FormBasic} from './Form';
import {setUser} from 'reducers/usersReducer/userReducer';
import {useState} from "react";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {showMess, contextHolder} = useMessages();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [remember, setRemember] = useState(JSON.parse(localStorage.getItem("userAuth")) ?? null);

    const handleLogin = (email, password) => {
        console.log(auth.currentUser)

        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user)
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                // user.createProfileChangeRequest().displayName = "Tester";
                const userAuth = {
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }
                setRemember(userAuth);
                if (user !== null) {
                    updateProfile(user, {
                        displayName: "Kirill Taran", photoURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAADoCAMAAAC+cQpPAAAAflBMVEX///8AAACBgYE+Pj7p6emsrKxNTU2Hh4ebm5vT09PU1NTHx8fDw8PPz8/JycnLy8u5ubn09PTh4eFzc3OWlpaOjo7j4+NhYWFoaGg0NDRUVFRubm5dXV3t7e0lJSV7e3sTExMdHR1FRUU7OzszMzOurq67u7sjIyMYGBikpKSXggkjAAAD0klEQVR4nO2d21bqMBRFyfEKikhFQOR2UDj2/3/wWKo2bdOGNBndq7jmmxk+rDkoachlp9cjhBBCCCGEEGInil8vPrbvy+c76SSBibcqYzOVjhOOK1XgSTpRKK6LZp/0pUOFYGUQ++RROpc/Y7PZObitq9TUQDqaJ5tKM6Wks/kR1ZipG+l0Xpg6x4yxdDwPprVmaiKdz4PnerWtdD4PqrvHlO6OuCrfad/spRM2ZmBTe5ZO2Jh7m9qrdMLGPNrUZtIJG3Owqc2lEzZmaFP7I52wMRW/ZzJi6YTNsal1+Afpk0VNOp8HD/VmnZ4i2daqRdLxfKh9sy2k0/nxVqN2KR3Oj5r+v8M9f8pdlVl3x48/VHzdujt81DAOt7o95fPDeFEyG0lnCsbo4rw6kBzRZJdqrTfntsCWsIqijr/KCMFjcIhvTyLej1bSYU8nmrxUjxyNdKTXvL+wqxi4lc5tJXL9wDLAZ8ktSzP17JDX23Y+Zgp4eXv819NMKdTuxN9MqaG0hBHfpzEFcZTp1YNkrKU9ytRuo3ABbzmxblbODbRxV+XElTtoU11h+pAUrDf3ZUAzsOHkbUg1rE4y5PMI1pEENVP30joawV5qKUjb0gJ2/QlIq6XWvS9uLKV9NPZh1a6lfTRKZxSoRjVJfo/afDav3yqe4/3z3/NTfMBqPes+H51k7Tf/Ex1bzbqBNSPZOXhDtfahGtWo1g5UoxrV2uFXqTnMllBNCKpRjWrtQDWqUa0dqEY1qrUD1agGruawnEE1IahGNaq1A9WoRrV2+FVqI6pRTQ6qUQ1KrbD3uOephlSqKS+yK7VY1eJcy0baRyeXLDnu46iWP250kNbRyT1QySEtR7XeUm8RlimgVXA71kV3VdMr0oLVH8zOZF8d/3ZV06o/Ix0WSpkccy2/Suw5q33vP54jnl7uTYfZQX+T2vVisTCUHsyqlkZD2EoBGia1pHsxVOzoWkFWU8mz5FGjGjJUoxoUVKMaFFSjGhRUoxoUVKMaFFTrolqfalRDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVIOCalSDgmpUg4JqVINiQDWqIUE1qkFBNapBccZqpvthk6t5Dbfp3UhndWRcVjhWSNmUm/fSWV0pX+g+S5oN98ZOpaO6Ur4gNi2RUmp+Ew7agKLCS9pcujR8KBuzCcU+8rv6S+FJhSosdSqHig/nn96MdMmyA9rn9hFp7fOsHenSbzfidfo1K/Tv/dnXwwhZouhUVv27/tjQHj2MOtfpE0IIIYQQQgD5D4thRYd84C2qAAAAAElFTkSuQmCC"
                    }).then(() => {
                        // Profile updated!
                        // ...
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });
                }
                // navigate('/');
            })
            .catch((error) => {
                console.log(error);
                showMess("error", error.message)
            })
    }

    if (remember) {
        dispatch(setUser({
            email: remember.email,
            id: remember.uid,
            token: remember.accessToken,
        }));
    }

    const handleLoginGoogle = (e)=> {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                dispatch(setUser({
                                email: user.email,
                                id: user.uid,
                                token: user.accessToken,
                            }));
            }).catch((error) => {
                console.log(error)
                showMess("error", error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    const handleLoginFacebook = (e)=> {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                const user = result.user;
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
            })
            .catch((error) => {
                console.log(error)
                showMess("error", error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
            });
    }

    return (<>
            {contextHolder}
            <FormBasic
                title="Login"
                handleClick={handleLogin}
                handleClickGoogle={handleLoginGoogle}
                handleClickFacebook={handleLoginFacebook}
            />
        </>
    )
}

export {Login}