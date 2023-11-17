import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchSliceState } from "@/schema/searchSlice";

const initialState: SearchSliceState = {
    categories: {
        started_searching: false,
        isLoading: false,
    },
    products:{
        started_searching: false,
        isLoading: false,
    }
};
const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setStartedSearchingCategory(state, action: PayloadAction<boolean>) {
            state.categories.started_searching = action.payload;
        },
        setLoadingCategory(state, action: PayloadAction<boolean>) {
            state.categories.isLoading = action.payload;
        },
        setStartedSearchingProduct(state, action: PayloadAction<boolean>) {
            state.categories.started_searching = action.payload;
        },
        setLoadingProduct(state, action: PayloadAction<boolean>) {
            state.categories.isLoading = action.payload;
        },
    },
});
export const {
    setStartedSearchingCategory,
    setLoadingCategory,
    setStartedSearchingProduct,
    setLoadingProduct
} = SearchSlice.actions;
export default SearchSlice;
