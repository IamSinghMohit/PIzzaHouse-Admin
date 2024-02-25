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
        categories: boolean;
        image:boolean;
        status:boolean;
    };
    fetching_states :{
        name:string;
        range:[number,number];
        category:string,
        status:TitemStatus;
    }
    categories:Record<string,boolean>
}

