import { StatusEnum, TitemStatus } from "@/modules/types/inex";
export interface TopingSliceInitialState {
    toping_management: {
        id:string;
        name: string;
        price: number;
        category: string;
        status:StatusEnum ;
        image:string;
    };
    updated_fields: {
        name: boolean;
        price: boolean;
        category: boolean;
        image:boolean;
    };
    fetching_states :{
        name:string;
        range:[number,number];
        category:string,
        status:TitemStatus;
    }
}

