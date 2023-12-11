import { TAttributeSchema, TCategorySchema } from "@/modules/category/schema";

export interface TCategoryUpdatedFields {
    image: boolean;
    name: boolean;
    attributes: boolean;
}

export interface TAttributes {
    id: string;
    title: string;
}
export interface TCategoryTotalAttributes {
    id: string;
    edited: boolean;
}

export interface TCategorySection {
    id: string;
    title: string;
    attributes: TAttributes[];
}

export interface TCategorySliceInitialState {
    category_price_sec: TCategorySection[];
    fetched_category_price_sec: TAttributeSchema;
    current_selected_category: TCategorySchema | null;
    updated_fields: TCategoryUpdatedFields;
    total_pages: number;
}
