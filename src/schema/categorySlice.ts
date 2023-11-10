import { AttributeSchemaType, CategorySchemaType } from "@/modules/category/schema";
export interface UpdatedFields{
    image:boolean;
    name:boolean;
    price_attributes:boolean;
}

export interface SubAttribute {
    id: string;
    title: string;
}
export interface TotalAttributes {
    id: string;
    edited: boolean;
}

export interface Attribute {
    id: string;
    attribute_title: string;
    attributes: SubAttribute[];
}

export interface CategorySliceInitialState {
    category_attr_array: Attribute[];
    fetched_category_attr:AttributeSchemaType;
    current_selected_category:CategorySchemaType | null;
    updated_fields: UpdatedFields
    total_pages:number;
}
