import { AttributeSchemaType } from "@/modules/category/schema";
import { ProductSubAttrType } from "@/modules/products/schema";
import {
    ProductManagement,
    ProductSliceInitialState,
} from "@/schema/productSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductSliceInitialState = {
    product_management: {
        product_name: "",
        product_category: "",
        product_price: 0,
        product_status: "draft",
        featured: true,
    },
    product_attributes: [
        {
            id: "",
            attribute_title: "",
            attributes: [{ title: "", value: 0, id: "", error: false }],
        },
    ],
};

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        manageProduct(
            state,
            action: PayloadAction<Partial<ProductManagement>>
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
                            value: 0,
                            error: false,
                        };
                    }),
                };
            });
        },
        setProductAttributeState(
            state,
            action: PayloadAction<{
                data: Partial<ProductSubAttrType>;
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
    },
});

export const { manageProduct, setProductAttributes, setProductAttributeState } =
    ProductSlice.actions;
