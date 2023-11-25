import { AttributeSchemaType } from "@/modules/category/schema";
import { ProductSchemaType } from "@/modules/products/schema";
import {
    ProductManagementType,
    ProductSliceInitialStateType,
    ProductSubAttributesType,
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
    product_attributes: [],
    default_prices: {},
    current_product: null
};

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductState(
            state,
            action: PayloadAction<Partial<ProductManagementType>>
        ) {
            state.product_management = {
                ...state.product_management,
                ...action.payload,
            };
        },
        setProductAttributes(
            state,
            action: PayloadAction<AttributeSchemaType>
        ) {
            state.product_attributes = action.payload.map((att) => {
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

        setCurrentProduct(state, action: PayloadAction<ProductSchemaType>) {
            state.current_product = action.payload;
        },
    },
});

export const {
    setProductState,
    setProductAttributes,
    setProductAttributeState,
    setDefaultPriceInputs,
    setCurrentProduct,
} = ProductSlice.actions;
