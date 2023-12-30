import { TGetCategorySections } from "@/modules/category/schema";
import { TProductSchema } from "@/modules/products/schema";
import { TGetProductPriceSectionSchema } from "@/modules/products/schema/Get";
import { TitemStatus } from "@/modules/types/inex";

export type TSetProductPriceSectoinAttributeData = {
    name: string;
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
    keyof TProductManagement | "product_featured" | "product_default_attributes" ,
    boolean
>;
export type TFetchingStates = {
    product_category: string;
    product_status:TitemStatus; 
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
          type: "SET_WITH_VALUE";
          data: TGetProductPriceSectionSchema["sections"];
      };

export type TSetProductDefaultPrices =
    | {
          type: "UPDATE";
          data: {
              section: string;
              name: string;
              id: string;
          };
      }
    | {
          type: "SET";
          data: TGetProductPriceSectionSchema['default_attributes']
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
    current_category:string;
};
