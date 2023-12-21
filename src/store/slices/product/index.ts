import {
    TProductSliceInitialStateType,
    TFetchingStates,
    TProductManagement,
    TProductUpdatedFields,
    TSetProductPriceSectoinAttribute,
    TSetProductPriceSectoinAttributeData,
} from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateProductPrice } from "./helper";

const initialState: TProductSliceInitialStateType = {
    product_management: {
        product_image: "",
        product_id: "",
        product_name: "",
        product_category: "",
        product_status: "Draft",
        product_description: "",
        product_price: 0,
        product_featured: false,
    },
    product_price_section_attribute: {},
    default_prices: {},
    updated_fields: {
        product_category: false,
        product_description: false,
        product_featured: false,
        product_name: false,
        product_price: false,
        product_status: false,
        product_image: false,
    },
    fetching_states: {
        current_selected_category: "",
        product_featured: false,
        product_name: "",
        product_status: "All",
        range: [0, 15000],
    },
    current_category_id: "",
};

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductState(
            state,
            action: PayloadAction<Partial<TProductManagement>>
        ) {
            state.product_management = {
                ...state.product_management,
                ...action.payload,
            };
        },
        setProductUpdatedFields(
            state,
            action: PayloadAction<{
                type: keyof TProductUpdatedFields | "all";
                value: boolean;
            }>
        ) {
            switch (action.payload.type) {
                case "all":
                    const obj: any = {};
                    for (let key in state.updated_fields) {
                        obj[key] = action.payload.value;
                    }
                    state.updated_fields = obj;
                    break;
                default:
                    state.updated_fields = {
                        ...state.updated_fields,
                        ...action.payload,
                    };
            }
        },
        setProductFetchingStates(
            state,
            action: PayloadAction<Partial<TFetchingStates>>
        ) {
            state.fetching_states = {
                ...state.fetching_states,
                ...action.payload,
            };
        },

        setCurrentCategoryId(state, action: PayloadAction<string>) {
            state.current_category_id = action.payload;
        },

        setProductPriceSectionAttribute(
            state,
            action: PayloadAction<TSetProductPriceSectoinAttribute>
        ) {
            switch (action.payload.type) {
                case "SET": {
                    const obj: Record<
                        string,
                        TSetProductPriceSectoinAttributeData
                    > = {};
                    action.payload.data.forEach((sec) => {
                        sec.attributes.forEach((att) => {
                            obj[att.id] = {
                                title: att.title,
                                value: undefined as unknown as any,
                                error: false,
                                section: sec.title,
                            };
                        });
                    });
                    state.product_price_section_attribute = obj;
                    break;
                }
                case "UPDATE": {
                    state.product_price_section_attribute = {
                        ...state.product_price_section_attribute,
                        ...action.payload.data,
                    };
                    const price = calculateProductPrice(state)
                    state.product_management.product_price = price;
                    break;
                }
                case "SET_FETCHED": {
                    const obj: Record<
                        string,
                        TSetProductPriceSectoinAttributeData
                    > = {};
                    action.payload.data.forEach((sec) => {
                        sec.attributes.forEach((att) => {
                            obj[att.id] = {
                                error: false,
                                section: sec.name,
                                title: att.attribute_title,
                                value: `${att.value}`,
                            };
                        });
                    });
                    state.product_price_section_attribute = obj;
                }
            }
        },

        setDefaultProductPrices(
            state,
            action: PayloadAction<{
                type: "SET" | "UPDATE";
                data: {
                    section: string;
                    attribute_name: string;
                    id: string;
                    value: string;
                };
            }>
        ) {
            switch (action.payload.type) {
                case "UPDATE": {
                    if (
                        state.default_prices[action.payload.data.section].id ===
                        action.payload.data.id
                    ) {
                        const obj = { ...state.default_prices };
                        delete obj[action.payload.data.section];
                        state.default_prices = obj;
                        const price = calculateProductPrice(state)
                        state.product_management.product_price = price;
                        return;
                    }

                    state.default_prices = {
                        ...state.default_prices,
                        ...{
                            [action.payload.data.section]:{
                               id:action.payload.data.id,
                               section:action.payload.data.section,
                               name:action.payload.data.attribute_name
                            }
                        },
                    };
                    const price = calculateProductPrice(state)
                    state.product_management.product_price = price;
                    break;
                }
                case "SET": {
                }
            }
        },
    },
});

export const {
    setProductState,
    setProductUpdatedFields,
    setProductFetchingStates,
    setProductPriceSectionAttribute,
    setCurrentCategoryId,
    setDefaultProductPrices,
} = ProductSlice.actions;