import {useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import {getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    sendEmailVerification} from "firebase/auth";
import {FormBasic} from './Form';
import {setUser} from 'reducers/usersReducer/userReducer';
import useMessages from "hooks/useMessages";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const {showMess, contextHolder} = useMessages();
    const auth = getAuth();

    const handleRegister = async (email, password) => {
       createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                sendEmailVerification(user)
                // navigation('/');
            })
            .catch((error) => {
                console.log(error)
                showMess("error", error.message)
            })

    }

    const handleLoginGoogle = (e)=> {
        const provider = new GoogleAuthProvider();
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
            // ...
        });
    }

    const handleLoginFacebook = (e)=> {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
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
                title="Sign up"
                handleClick={handleRegister}
                handleClickGoogle={handleLoginGoogle}
                handleClickFacebook={handleLoginFacebook}
            />
        </>
    )
}

export {SignUp};