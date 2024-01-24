import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    TCategorySection,
    TCategorySliceInitialState,
} from "./types";
import {
    TCategorySchema,
} from "@/modules/category/schema";

type PayloadType = "REPLACE" | "PUSH";

const initialState: TCategorySliceInitialState = {
    category_price_sec: [],
    category_name: "",
    category_search_name: "",
    current_selected_category: null,
    is_image_updated: false,
};

export const CategorySlice = createSlice({
    initialState,
    name: "category",
    reducers: {
        setCategorySections(
            state,
            action: PayloadAction<{
                data: TCategorySection[] | TCategorySection;
                type: PayloadType;
            }>,
        ) {
            if (
                action.payload.type == "REPLACE" &&
                Array.isArray(action.payload.data)
            ) {
                state.category_price_sec = action.payload.data;
            } else if (
                action.payload.type == "PUSH" &&
                !Array.isArray(action.payload.data)
            ) {
                state.category_price_sec = [
                    ...state.category_price_sec,
                    action.payload.data,
                ];
            }
        },
        updatePriceSection(state, action: PayloadAction<TCategorySection>) {
            state.category_price_sec = state.category_price_sec.map((item) => {
                if (item.id === action.payload.id) {
                    // Update the properties of the matching item
                    return {
                        ...item,
                        name: action.payload.name,
                        attributes: action.payload.attributes,
                    };
                }
                return item; // Keep other items as they are
            });
        },

        deletePriceSection(state, action: PayloadAction<string>) {
            state.category_price_sec = state.category_price_sec.filter(
                (item) => item.id != action.payload,
            );
        },

        setCurrentSelectedCategory(
            state,
            action: PayloadAction<TCategorySchema | null>,
        ) {
            state.current_selected_category = action.payload;
        },
        setCategoryName(state, action: PayloadAction<string>) {
            state.category_name = action.payload;
        },
        setCategoryImageUpdated(state, action: PayloadAction<boolean>) {
            state.is_image_updated = action.payload;
        },
        setCategorySearchName(state, action: PayloadAction<string>) {
            state.category_search_name = action.payload;
        },
    },
});

export const {
    setCategorySections,
    updatePriceSection,
    deletePriceSection,
    setCategoryImageUpdated,
    setCategorySearchName,
    setCategoryName,
    setCurrentSelectedCategory,
} = CategorySlice.actions;
