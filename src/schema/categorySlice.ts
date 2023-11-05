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
    categoryArray: Attribute[];
    fetchedCategoryAttr:AttributeSchemaType;
    currentSelectedCategory:CategorySchemaType | null;
    updatedFields: UpdatedFields
}
