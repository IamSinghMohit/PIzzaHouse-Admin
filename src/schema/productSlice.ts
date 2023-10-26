export interface ProductSubAttributes {
    title: string;
    value: number;
}
export interface ProductAttributes {
    attribute_title: string;
    attributes: ProductSubAttributes[];
}
export interface ProductSliceInitialState {
    productName: string;
    productCategory: string;
    productPrice: number;
    productStatus: "draft" | "published";
    productAttributes: ProductAttributes[];
}
