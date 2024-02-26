import { StatusEnum, TitemStatus } from "@/modules/types/inex";

export type Ttoping_updated_fields = {
    name: boolean;
    price: boolean;
    categories: boolean;
    image: boolean;
    status: boolean;
};
export interface TopingSliceInitialState {
    toping_management: {
        id: string;
        name: string;
        price: number;
        status: StatusEnum;
        image: string;
    };
    updated_fields: Ttoping_updated_fields;
    fetching_states: {
        name: string;
        range: [number, number];
        category: string;
        status: TitemStatus;
    };
    categories: Record<string, boolean>;
}
