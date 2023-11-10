import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchSliceState } from "@/schema/searchSlice";
import { CategorySchemaType } from "@/modules/category/schema";

const initialState: SearchSliceState = {
    categories: {
        startedSearching:false,
        fetchedCategories: [],
        isLoading: false,
    },
};
const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchedCategories(
            state,
            action: PayloadAction<
                CategorySchemaType | CategorySchemaType[] | ((arg: CategorySchemaType[]) => any)
            >
        ) {
            // state.categories.fetchedCategories = action.payload;

            if (typeof action.payload == "function") {
                state.categories.fetchedCategories = action.payload(
                    state.categories.fetchedCategories
                );
            } else if (Array.isArray(action.payload)) {
                state.categories.fetchedCategories = [
                    ...state.categories.fetchedCategories,
                    ...action.payload,
                ];
            } else {
                state.categories.fetchedCategories = [
                    ...state.categories.fetchedCategories,
                    action.payload,
                ];
            }
        },
        setSearchCategoryLoading(state, action: PayloadAction<boolean>) {
            state.categories.isLoading = action.payload;
        },
        setStartedSearching(state,action:PayloadAction<boolean>){
            state.categories.startedSearching = action.payload;
        }
    },
});
export const { setSearchedCategories ,setSearchCategoryLoading,setStartedSearching} = SearchSlice.actions;
export default SearchSlice;
