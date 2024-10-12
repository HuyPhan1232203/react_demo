import { createSlice } from "@reduxjs/toolkit";


const cartSlide = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            const product = action.payload;
            //check if koi exist in the store
            const existProduct=state.find((koi) => koi.id===product.id);
            if(existProduct){
                existProduct.quantity +=1;
            }
            //yes : increse quantity
            else{
                state.push({...product,quantity:1});
            }

            //no : add to store and add field quantity
        },
        clearAll:()=>[],
    },
});

export const {addProduct,clearAll} = cartSlide.actions;
export default cartSlide.reducer;