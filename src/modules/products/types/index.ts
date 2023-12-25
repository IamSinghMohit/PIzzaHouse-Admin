export enum ProductStatusEnum {
    DRAFT = "Draft",
    PUBLISHED = "Published",
}

// export interface ProductSubAttrType {
//     title: string;
//     value: number;
// }
// export interface ProductAttrType {
//     attribute_title: string;
//     attributes: Array<ProductSubAttrType>;
// }
// export interface ProductType {
//     name: string;
//     category: string;
//     price: number;
//     description: string;
//     status: "draft" | "published";
//     price_attributes: Array<ProductAttrType>;
// }

export interface PriceAttributesState {
    attribute_title: string;
    attributes: Array<{
        title: string;
        value: number;
        error: boolean;
    }>;
}
