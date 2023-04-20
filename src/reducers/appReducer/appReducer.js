import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: true,
    local: "en"
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setAppLocaleAction: (state, action) =>{
            state.local = action.payload
        },
    },
});

export const {setAppLocaleAction} = themeSlice.actions;

