import { TopingSliceInitialState } from "@/types/slice/topingSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TopingSliceInitialState = {
    name: "",
    price: 0,
};

export const TopingSlice = createSlice({
    name: "toping",
    initialState,
    reducers: {
        setTopingName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setTopingPrice(state, action: PayloadAction<string>) {
            state.price = parseInt(action.payload)
        },
    },
});

export const {setTopingName,setTopingPrice} = TopingSlice.actions
