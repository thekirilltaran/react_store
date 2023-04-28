import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    email: null,
    token: null,
    id: null,
    emailVerified: null,
    fullName: null,
    phone: null,
    avatar: null,
    birthday: null,
    gender: null,
    language: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.emailVerified = action.payload.emailVerified
            state.fullName = action.payload.fullName;
            state.phone= action.payload.phone;
            state.avatar = action.payload.avatar;
            state.birthday = action.payload.birthday;
            state.gender = action.payload.gender;
            state.language = action.payload.language;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;
