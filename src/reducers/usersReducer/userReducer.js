import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    email: null,
    token: null,
    id: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            console.log(localStorage.getItem("userAuth"))
            state.email = null;
            state.token = null;
            state.id = null;
            localStorage.removeItem("userAuth");
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;
