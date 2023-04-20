import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const existingProduct = state.cart.find(
                (product) => product.id === action.payload.id
            );
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeProduct: (state, action) => {
            const index = state.cart.findIndex(
                (product) => product.id === action.payload.id
            );
            state.cart.splice(index, 1);
        },
    },
});


const cartCountSelector = (state) => {
    return state.cart.cart.reduce((total, product) => total + product.quantity, 0);
};

const cartValueSelector = (state) => {
    return state.cart.cart.reduce(
        (total, product) => total + product.price * product.quantity, 0
    );
};

const { addProduct, removeProduct } = cartSlice.actions;

export {
    cartSlice,
    addProduct,
    cartCountSelector,
    cartValueSelector,
};
