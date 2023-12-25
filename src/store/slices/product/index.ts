import {
    TProductSliceInitialStateType,
    TFetchingStates,
    TProductManagement,
    TProductUpdatedFields,
    TSetProductPriceSectoinAttribute,
    TSetProductPriceSectoinAttributeData,
    TSetProductDefaultPrices,
} from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    current_selections: {
        current_category_id: "",
        current_selected_product: null,
    },
};

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductState(
            state,
            action: PayloadAction<Partial<TProductManagement>>,
        ) {
            state.product_management = {
                ...state.product_management,
                ...action.payload,
            };
            const keys = Object.keys(action.payload) as Array<
                keyof TProductManagement
            >;
            keys.forEach((key) => {
                if (key != "product_id") {
                    state.updated_fields[key] = true;
                }
            });
        },

        setProductUpdatedFields(
            state,
            action: PayloadAction<{
                type: keyof TProductUpdatedFields | "all";
                value: boolean;
            }>,
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
            action: PayloadAction<Partial<TFetchingStates>>,
        ) {
            state.fetching_states = {
                ...state.fetching_states,
                ...action.payload,
            };
        },

        setCurrentSelections(state, action: PayloadAction<string>) {
            state.current_selections.current_category_id = action.payload;
        },

        setProductPriceSectionAttribute(
            state,
            action: PayloadAction<TSetProductPriceSectoinAttribute>,
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
                                name: att.name,
                                value: "",
                                error: false,
                                section: sec.name,
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
                    const keys = Object.keys(state.default_prices);
                    let price = 0;
                    keys.forEach((key) => {
                        const attkey = state.default_prices[key].id;
                        price +=
                            parseInt(
                                state.product_price_section_attribute[attkey]
                                    .value,
                            ) || 0;
                    });
                    state.product_management.product_price = price;
                    break;
                }
                case "SET_WITH_VALUE": {
                    const obj: Record<
                        string,
                        TSetProductPriceSectoinAttributeData
                    > = {};
                    action.payload.data.forEach((sec) => {
                        sec.attributes.forEach((att) => {
                            obj[att.id] = {
                                error: false,
                                section: sec.name,
                                name: att.name,
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
            action: PayloadAction<TSetProductDefaultPrices>,
        ) {
            switch (action.payload.type) {
                case "UPDATE": {
                    if (
                        state.default_prices[action.payload.data.section]
                            ?.id === action.payload.data.id
                    ) {
                        const obj = { ...state.default_prices };
                        delete obj[action.payload.data.section];
                        state.default_prices = obj;
                        const att =
                            state.product_price_section_attribute[
                                action.payload.data.id
                            ];
                        state.product_management.product_price =
                            state.product_management.product_price -
                            parseInt(att.value);
                        return;
                    }
                    state.default_prices = {
                        ...state.default_prices,
                        ...{
                            [action.payload.data.section]: {
                                id: action.payload.data.id,
                                section: action.payload.data.section,
                                name: action.payload.data.name,
                            },
                        },
                    };
                    const keys = Object.keys(state.default_prices);
                    let price = 0;
                    keys.forEach((key) => {
                        const attkey = state.default_prices[key].id;
                        price +=
                            parseInt(
                                state.product_price_section_attribute[attkey]
                                    .value,
                            ) || 0;
                    });
                    state.product_management.product_price = price;
                    break;
                }
                case "SET": {
                    const obj:any = {};
                    action.payload.data.forEach((item) => {
                        obj[item.section] = {
                            id: item.id,
                            section: item.section,
                            name: item.name,
                        };
                    });
                    state.default_prices = obj;
                    break;
                }
                default: {
                    state.default_prices = {};
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
    setCurrentSelections,
    setDefaultProductPrices,
} = ProductSlice.actions;
