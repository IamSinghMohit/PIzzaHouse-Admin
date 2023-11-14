import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchSliceState } from "@/schema/searchSlice";

const initialState: SearchSliceState = {
    categories: {
        started_searching: false,
        isLoading: false,
    },
};
const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setStartedSearching(state, action: PayloadAction<boolean>) {
            state.categories.started_searching = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.categories.isLoading = action.payload;
        },
    },
});
export const { setStartedSearching, setLoading } = SearchSlice.actions;
export default SearchSlice;
