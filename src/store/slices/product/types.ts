import { TGetCategorySections } from "@/modules/category/schema";
import { TProductSchema } from "@/modules/products/schema";
import { TGetProductPriceSectionSchema } from "@/modules/products/schema/Get";

export type TSetProductPriceSectoinAttributeData = {
    title: string;
    value: string;
    error: boolean;
    section: string;
};
export type ProductSubAttributesType = {
    title: string;
    value: number | null;
    id: string;
    error: boolean;
};
export type TProductUpdatedFields = Record<
    keyof TProductManagement | "product_featured",
    boolean
>;
export type TFetchingStates = {
    current_selected_category: string;
    product_status: "All" | "Draft" | "Published";
    product_featured: boolean;
    product_name: string;
    range: [number, number];
};
export type TProductManagement = {
    product_image: string;
    product_id: string;
    product_name: string;
    product_category: string;
    product_status: "Draft" | "Published";
    product_description: string;
    product_featured: boolean;
    product_price: number;
};
export type TCurrentSelections = {
    current_selected_product: TProductSchema | null;
    current_category_id: string;
};
export type TSetProductPriceSectoinAttribute =
    | {
          type: "SET";
          data: TGetCategorySections["data"];
      }
    | {
          type: "UPDATE";
          data: Record<string, TSetProductPriceSectoinAttributeData>;
      }
    | {
          type: "SET_FETCHED";
          data: TGetProductPriceSectionSchema["sections"];
      };
export type TProductUtilityStates = {
    featured_status: boolean;
};
export type TProductSliceInitialStateType = {
    product_management: TProductManagement;
    product_price_section_attribute: Record<
        string,
        TSetProductPriceSectoinAttributeData
    >;
    default_prices: Record<
        string,
        { name: string; id: string; section: string }
    >;
    updated_fields: Omit<TProductUpdatedFields, "product_id">;
    fetching_states: TFetchingStates;
    current_category_id: string;
};
