import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  cartFavorite: []
};


const cartFavoriteSlice = createSlice({
    name: "cartFavorite",
    initialState,
    reducers: {
        addFavoriteProduct: (state, action) => {
            const existingProduct = state.cartFavorite.find(
                product=> product.id === action.payload.id);
            if (existingProduct) {
                console.log("You have already added product")
            } else {
                console.log("You added product")
                state.cartFavorite.push({...action.payload, favorite: true})
            }
        },
        removeFavoriteProduct: (state, action) => {
            const index = state.cartFavorite.findIndex(
                (product) => product.id === action.payload.id
            );
            state.cartFavorite.splice(index, 1);
        },
    }
});

const { addFavoriteProduct, removeFavoriteProduct } = cartFavoriteSlice.actions;

export {
    cartFavoriteSlice,
    addFavoriteProduct,
    removeFavoriteProduct
};
