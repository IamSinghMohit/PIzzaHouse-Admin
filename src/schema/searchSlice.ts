import { CategorySchemaType } from "@/modules/category/schema";

export interface SearchSliceState {
    categories: {
        startedSearching: boolean;
        fetchedCategories: CategorySchemaType[];
        isLoading: boolean;
    };
}
