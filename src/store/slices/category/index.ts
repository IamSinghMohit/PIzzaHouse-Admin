import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import {
    TCategorySection,
    TCategorySliceInitialState,
    TUpdatedFields,
} from "./types";
import {
    TCategorySchema,
    TGetCategorySections,
} from "@/modules/category/schema";

type PayloadType = "REPLACE" | "PUSH";


const initialState: TCategorySliceInitialState = {
    category_price_sec: [],
    category_name: "",
    category_search_name: "",
    current_selected_category: null,
    updated_fields: {
        name: false,
        image: false,
        sections: false,
    },
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
            if (!state.updated_fields.sections) {
                state.updated_fields.sections = true;
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
                (item) => item.id != action.payload
            );
            if (!state.updated_fields.sections) {
                state.updated_fields.sections = true;
            }
        },

        setCurrentSelectedCategory(
            state,
            action: PayloadAction<TCategorySchema | null>
        ) {
            state.current_selected_category = action.payload;
        },
        setCategoryName(state, action: PayloadAction<string>) {
            state.category_name = action.payload;
            if (!state.updated_fields.name) {
                state.updated_fields.name = true;
            }
        },
        setUpdatedFields(
            state,
            action: PayloadAction<{
                type: TUpdatedFields;
                value: boolean;
            }>
        ) {
            switch (action.payload.type) {
                case "image":
                    state.updated_fields.image = action.payload.value;
                    break;
                case "name":
                    state.updated_fields.name = action.payload.value;
                    break;
                case "sections":
                    state.updated_fields.sections = action.payload.value;
                    break;
                case "all":
                    const obj: any = {};
                    for (let key in state.updated_fields) {
                        obj[key] = action.payload.value;
                    }
                    state.updated_fields = obj;
                    break;
                default:
                    null;
            }
        },
        setCategorySearchName(state, action: PayloadAction<string>) {
            state.category_search_name = action.payload;
        },
        setFetchedPriceSec(
            state,
            action: PayloadAction<TGetCategorySections["data"]>
        ) {
            state.category_price_sec = action.payload.map((cat) => {
                return {
                    id: cat.id,
                    name: cat.title,
                    attributes: cat.attributes,
                };
            });
        },
    },
});

export const {
    setCategorySections,
    updatePriceSection,
    setFetchedPriceSec,
    deletePriceSection,
    setUpdatedFields,
    setCategorySearchName,
    setCategoryName,
    setCurrentSelectedCategory,
} = CategorySlice.actions;