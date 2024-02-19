import { TCategorySelectorPayload } from "@/modules/commponents/CategorySelector";
import { StatusEnum, TitemStatus } from "@/modules/types/inex";
export interface TopingSliceInitialState {
    toping_management: {
        id:string;
        name: string;
        price: number;
        status:StatusEnum ;
        image:string;
    };
    updated_fields: {
        name: boolean;
        price: boolean;
        category: boolean;
        image:boolean;
        status:boolean;
    };
    fetching_states :{
        name:string;
        range:[number,number];
        category:string,
        status:TitemStatus;
    }
    category:TCategorySelectorPayload | null
}

