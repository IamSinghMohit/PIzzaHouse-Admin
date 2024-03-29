import { TCategorySchema } from "@/modules/category/schema";


export type TAttributes = {
    id: string;
    name: string;
};
export type TCategoryTotalAttributes = {
    id: string;
    edited: boolean;
};

export type TCategorySection = {
    id: string;
    name: string;
    attributes: TAttributes[];
};

export type TCategorySliceInitialState = {
    category_price_sec: TCategorySection[];
    category_name: string;
    category_search_name: string;
    current_selected_category: TCategorySchema | null;
    is_image_updated:boolean;
};

export type TUpdatedFields = "name" | "image" | "sections" | "all";
