import { configureStore } from "@reduxjs/toolkit";

import {cartSlice} from './cartReducer/cartReducer';
import {themeSlice} from './appReducer/appReducer';
import {userSlice} from './usersReducer/userReducer';
import {cartFavoriteSlice} from './favoritesReducer/favoriteReducer';

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        theme: themeSlice.reducer,
        user: userSlice.reducer,
        cartFavorite: cartFavoriteSlice.reducer
    }
});

// store.subscribe(() => {
//         console.log('true')
// })

export {store};