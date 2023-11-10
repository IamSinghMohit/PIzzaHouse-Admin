import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attribute, CategorySliceInitialState } from "@/schema/categorySlice";
import { CategorySchemaType } from "@/modules/category/schema";

const initialState: CategorySliceInitialState = {
    category_attr_array: [],
    fetched_category_attr: [],
    current_selected_category: null,
    updated_fields: {
        name: false,
        image: false,
        price_attributes: false,
    },
    total_pages: 1,
};

export const CategorySlice = createSlice({
    initialState,
    name: "category",
    reducers: {
        setPriceAttribute(
            state,
            action: PayloadAction<
                Attribute | Attribute[] | ((arg: Attribute[]) => any)
            >
        ) {
            if (typeof action.payload == "function") {
                state.category_attr_array = action.payload(
                    state.category_attr_array
                );
            } else if (Array.isArray(action.payload)) {
                state.category_attr_array = [
                    ...state.category_attr_array,
                    ...action.payload,
                ];
            } else {
                state.category_attr_array = [
                    ...state.category_attr_array,
                    action.payload,
                ];
            }
        },
        updateAttribute(state, action: PayloadAction<Attribute>) {
            state.category_attr_array = state.category_attr_array.map(
                (item) => {
                    if (item.id === action.payload.id) {
                        // Update the properties of the matching item
                        return {
                            ...item,
                            attribute_title: action.payload.attribute_title,
                            attributes: action.payload.attributes,
                        };
                    }
                    return item; // Keep other items as they are
                }
            );
        },

        deleteAttribute(state, action: PayloadAction<string>) {
            state.category_attr_array = state.category_attr_array.filter(
                (item) => item.id != action.payload
            );
        },

        setCurrentSelectedCategory(
            state,
            action: PayloadAction<CategorySchemaType>
        ) {
            state.current_selected_category = action.payload;
        },

        mutatePriceAttr(
            state,
            action: PayloadAction<
                Attribute[] | ((arg: Attribute[]) => Attribute[])
            >
        ) {
            if (typeof action.payload == "function") {
                state.category_attr_array = action.payload(
                    state.category_attr_array
                );
            } else {
                state.category_attr_array = action.payload;
            }
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
                    state.updated_fields.price_attributes = true;
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
    setPriceAttribute,
    updateAttribute,
    deleteAttribute,
    mutatePriceAttr,
    setUpdatedFields,
    setTotalPages,
    setCurrentSelectedCategory,
} = CategorySlice.actions;
