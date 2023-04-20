import {useDispatch, useSelector } from 'react-redux';
import {setAppLocaleAction} from 'reducers/appReducer/appReducer'

const useLocale = () => {
    const dispatch = useDispatch();
    const local = useSelector(state =>state.theme.local);
    const setLocale = (local) => {
        return dispatch(setAppLocaleAction(local))
    }
    return { local, setLocale };
};

export default useLocale;