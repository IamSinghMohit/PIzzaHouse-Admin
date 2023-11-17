export interface ProductSubAttributes {
    title: string;
    value: number;
    id:string;
    error:boolean;
}
export interface ProductAttributes {
    id:string;
    attribute_title: string;
    attributes: ProductSubAttributes[];
}
export interface ProductManagement {
    product_name: string;
    product_category: string;
    product_price: number;
    product_status: "draft" | "published";
    featured:boolean;
}
export interface ProductSliceInitialState {
    product_management: ProductManagement;
    product_attributes: ProductAttributes[];
}
