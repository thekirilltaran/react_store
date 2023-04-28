import { useDispatch, useSelector } from 'react-redux';
import {auth} from 'apis/fiebase';
import {useEffect, useState} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import { setUser } from "../reducers/usersReducer/userReducer";


export function useAuth() {
    const {email, token, id, emailVerified} = useSelector(state => state.user);
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                    emailVerified: user.emailVerified
                }));
                setLoading(false)
            } else {
                setLoading(false)
            }
        })
    },[])

    return {
        isAuth: !!email,
        email,
        token,
        id,
        loading: loading,
        emailVerified
    };
}