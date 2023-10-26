import { ProductSliceInitialState} from "@/schema/productSlice";
import { createSlice } from "@reduxjs/toolkit";
const initialState: ProductSliceInitialState = {
    productName:"",
    productCategory: "",
    productPrice: 0,
    productStatus:'draft',
    productAttributes: [
        {
            attribute_title: "",
            attributes: [{ title: "", value: 0 }],
        },
    ],
};

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
});
