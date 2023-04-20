import { configureStore } from "@reduxjs/toolkit";

import {cartSlice} from './cartReducer/cartReducer';
import {themeSlice} from './appReducer/appReducer';
import {userSlice} from './usersReducer/userReducer';

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        theme: themeSlice.reducer,
        user: userSlice.reducer
    }
});

export {store};