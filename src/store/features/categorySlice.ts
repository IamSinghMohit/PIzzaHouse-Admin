import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCategorySection, TCategorySliceInitialState } from "@/types/slice/Category";
import { TCategorySchema } from "@/modules/category/schema";

type PayloadType = "REPLACE" | "PUSH";

const initialState: TCategorySliceInitialState = {
    category_price_sec: [],
    fetched_category_price_sec: [],
    current_selected_category: null,
    updated_fields: {
        name: false,
        image: false,
        attributes: false,
    },
    total_pages: 1,
};

export const CategorySlice = createSlice({
    initialState,
    name: "category",
    reducers: {
        setCategorySections(
            state,
            action: PayloadAction<{
                data:  TCategorySection[] |   TCategorySection;
                type: PayloadType;
            }>
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
                        title: action.payload.title,
                        attributes: action.payload.attributes,
                    };
                }
                return item; // Keep other items as they are
            });
        },

        deletePriceSection(state, action: PayloadAction<string>) {
            state.category_price_sec = state.category_price_sec.filter(
                (item) => item.id != action.payload
            );
        },

        setCurrentSelectedCategory(
            state,
            action: PayloadAction<TCategorySchema | null>
        ) {
            state.current_selected_category = action.payload;
        },

        setUpdatedFields(
            state,
            action: PayloadAction<"name" | "image" | "price_attributes">
        ) {
            switch (action.payload) {
                case "image":
                    state.updated_fields.image = true;
                    break;
                case "name":
                    state.updated_fields.name = true;
                    break;
                case "price_attributes":
                    state.updated_fields.attributes = true;
                    break;
                default:
                    null;
            }
        },
        setTotalPages(state, action: PayloadAction<number>) {
            state.total_pages = action.payload;
        },
    },
});

export const {
    setCategorySections,
    updatePriceSection,
    deletePriceSection,
    setUpdatedFields,
    setTotalPages,
    setCurrentSelectedCategory,
} = CategorySlice.actions;
