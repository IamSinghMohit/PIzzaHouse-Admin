import { ProductSchemaType } from "@/modules/products/schema";

export type ProductSubAttributesType = {
    title: string;
    value: number | null;
    id: string;
    error: boolean;
};
export type TProductUpdatedFields = Record<
    keyof TProductManagement | "product_image",
    boolean
>;
export type TProductSection = {
    id: string;
    attribute_title: string;
    attributes: ProductSubAttributesType[];
};
export type TFetchingStates = {
    current_selected_category: string;
    product_status: "All" | "Draft" | "Publish";
    product_name: string;
    featured_status: boolean;
    range: [number, number];
};
export type TProductManagement = {
    product_name: string;
    product_category: string;
    product_status: "Draft" | "Published";
    product_description: string;
    product_featured: boolean;
    product_price: number;
};
export type ProductSliceInitialStateType = {
    product_management: TProductManagement;
    product_price_sec: TProductSection[];
    default_prices: Record<string, string>;
    current_selected_product: ProductSchemaType | null;
    updated_fields: TProductUpdatedFields;
    fetching_states: TFetchingStates;
};
