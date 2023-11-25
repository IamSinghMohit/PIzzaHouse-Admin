import { ProductSchemaType } from "@/modules/products/schema";

export interface ProductSubAttributesType {
    title: string;
    value: number | null;
    id:string;
    error:boolean;
}
export interface ProductAttributesType {
    id:string;
    attribute_title: string;
    attributes: ProductSubAttributesType[];
}
export interface ProductManagementType {
    product_name: string;
    product_category: string;
    product_status: "Draft" | "Published";
    product_description:string;
    product_featured:boolean;
    product_price:number;
}
export interface ProductSliceInitialStateType {
    product_management: ProductManagementType;
    product_attributes: ProductAttributesType[];
    default_prices:Record<string,string >;
    current_product:ProductSchemaType | null
}