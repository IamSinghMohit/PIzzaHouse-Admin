import { TCategorySchema } from "@/modules/category/schema";

export interface TCategoryUpdatedFields {
    image: boolean;
    name: boolean;
    sections: boolean;
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
    category_name: string;
    category_search_name: string;
    current_selected_category: TCategorySchema | null;
    updated_fields: TCategoryUpdatedFields;
}

export type TUpdatedFields = "name" | "image" | "sections" | 'all'
