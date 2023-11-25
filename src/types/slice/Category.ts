import { AttributeSchemaType,CategorySchemaType } from "@/modules/category/schema";

export interface CategoryUpdatedFieldsType{
    image:boolean;
    name:boolean;
    price_attributes:boolean;
}

export interface CategorySubAttributeType {
    id: string;
    title: string;
}
export interface CategoryTotalAttributesType {
    id: string;
    edited: boolean;
}

export interface Attribute {
    id: string;
    attribute_title: string;
    attributes:CategorySubAttributeType [];
}

export interface CategorySliceInitialState {
    category_attr_array: Attribute[];
    fetched_category_attr:AttributeSchemaType;
    current_selected_category:CategorySchemaType | null;
    updated_fields: CategoryUpdatedFieldsType
    total_pages:number;
}