import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
    },reducers :{
        addToCart:(state,action) => {
            const newItem = action.payload;

            const existingItem = state.items.find((item) => item.id === newItem.id);

            if(existingItem){
                existingItem.quantity +=1;
            } else {
                state.items.push({...newItem,quantity:1});
            }
        },
        decreaseQuantity: (state,action) => {
            const itemToDecrease = action.payload;
            const existingItem = state.items.find((item) => item.id === itemToDecrease.id);

            if(existingItem){
                if(existingItem.quantity > 1){
                    existingItem.quantity -= 1;
                }
            }
        },
        removeFromCart:(state,action) => {
            const itemToRemove = action.payload;
            state.items=state.items.filter((item) => item.id !== itemToRemove);

        },
        clearCart:(state) => {
            state.items=[];
        },
    }
});

export const {addToCart,decreaseQuantity,removeFromCart,clearCart}=cartSlice.actions;

export default cartSlice.reducer;