export interface ProductSubAttrType {
    title: string;
    value: number;
}
export interface ProductAttrType {
    attribute_title: string;
    attributes: Array<ProductSubAttrType>;
}
export interface ProductTypeType {
    name: string;
    category: string;
    price: number;
    description: string;
    status: "draf" | "published";
    price_attributes: Array<ProductAttrType>;
}

export interface PriceAttributesState {
    attribute_title: string;
    attributes: Array<{
        title: string;
        value: number; 
        error:boolean;
    }>;
}
