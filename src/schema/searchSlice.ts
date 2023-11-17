export interface SearchSliceState {
    categories: {
        started_searching: boolean;
        isLoading: boolean;
    };
    products: {
        started_searching: boolean;
        isLoading: boolean;
    };
}
