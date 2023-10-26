import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attribute, CategorySliceInitialState } from "@/schema/categorySlice";
import { CategorySchemaType } from "@/modules/category/schema";

const initialState: CategorySliceInitialState = {
    categoryArray: [],
    fetchedCategoryAttr: [],
    currentSelectedCategory: null,
};

export const CategorySlice = createSlice({
    initialState,
    name: "category",
    reducers: {
        setPriceAttribute(
            state,
            action: PayloadAction<Attribute[] | Attribute>
        ) {
            if (action.payload instanceof Array) {
                state.categoryArray = [
                    ...state.categoryArray,
                    ...action.payload,
                ];
                console.log("runned");
            } else {
                state.categoryArray = [...state.categoryArray, action.payload];
            }
        },
        updateAttribute(state, action: PayloadAction<Attribute>) {
            state.categoryArray = state.categoryArray.map((item) => {
                if (item.id === action.payload.id) {
                    // Update the properties of the matching item
                    return {
                        ...item,
                        attribute_title: action.payload.attribute_title,
                        attributes: action.payload.attributes,
                    };
                }
                return item; // Keep other items as they are
            });
        },

        deleteAttribute(state, action: PayloadAction<string>) {
            state.categoryArray = state.categoryArray.filter(
                (item) => item.id != action.payload
            );
        },

        setCurrentSelectedCategory(
            state,
            action: PayloadAction<CategorySchemaType>
        ) {
            state.currentSelectedCategory = action.payload;
        },

        mutatePriceAttr(state, action: PayloadAction<Attribute[]>) {
            state.categoryArray = action.payload;
        },
    },
});

export const {
    setPriceAttribute,
    updateAttribute,
    deleteAttribute,
    mutatePriceAttr,
    setCurrentSelectedCategory,
} = CategorySlice.actions;
