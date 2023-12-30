export interface PriceAttributesState {
    attribute_title: string;
    attributes: Array<{
        title: string;
        value: number;
        error: boolean;
    }>;
}
