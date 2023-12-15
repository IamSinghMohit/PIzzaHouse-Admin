import {
    ProductSliceInitialStateType,
    TFetchingStates,
    TProductManagement,
    TProductUpdatedFields,
} from "@/types/slice/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductSliceInitialStateType = {
    product_management: {
        product_name: "",
        product_category: "",
        product_status: "Draft",
        product_description: "",
        product_featured: false,
        product_price: 0,
    },
    product_price_sec: [],
    default_prices: {},
    current_selected_product: null,
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
        current_selected_category: '',
        featured_status: false,
        product_name: "",
        product_status: "All",
        range: [0, 15000],
    },
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
        setProductAttributes(
            state,
            action: PayloadAction<AttributeSchemaType>
        ) {
            state.product_sections = action.payload.map((att) => {
                return {
                    id: att.id,
                    attribute_title: att.attribute_title,
                    attributes: att.attributes.map((a) => {
                        return {
                            id: a.id,
                            title: a.title,
                            value: null,
                            error: false,
                        };
                    }),
                };
            });
        },

        setProductAttributeState(
            state,
            action: PayloadAction<{
                data: Partial<ProductSubAttributesType>;
                blockId: string;
                attId: string;
            }>
        ) {
            state.product_attributes = state.product_attributes.map((block) => {
                if (block.id == action.payload.blockId) {
                    return {
                        ...block,
                        attributes: block.attributes.map((att) => {
                            if (att.id == action.payload.attId) {
                                return {
                                    ...att,
                                    ...action.payload.data,
                                };
                            }
                            return att;
                        }),
                    };
                }
                return block;
            });
        },

        setDefaultPriceInputs(
            state,
            action: PayloadAction<Record<string, string>>
        ) {
            state.default_prices = {
                ...state.default_prices,
                ...action.payload,
            };
        },

        setCurrentSelectedProduct(
            state,
            action: PayloadAction<ProductSchemaType>
        ) {
            state.current_selected_product = action.payload;
        },
    },
});

export const {
    setProductState,
    setProductUpdatedFields,
    setProductFetchingStates,
    setProductAttributes,
    setProductAttributeState,
    setDefaultPriceInputs,
    setCurrentSelectedProduct,
} = ProductSlice.actions;
