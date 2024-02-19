import { StatusEnum } from "@/modules/types/inex";
import { TopingSliceInitialState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCategorySelectorPayload } from "@/modules/commponents/CategorySelector";

const initialState: TopingSliceInitialState = {
    toping_management: {
        id: "",
        name: "",
        price: 0,
        status: StatusEnum.DRAFT,
        image: "",
    },
    updated_fields: {
        name: false,
        category: false,
        price: false,
        image: false,
        status:false,
    },
    fetching_states: {
        name: "",
        range: [0, 0],
        category: "",
        status: "All",
    },
    category: null,
};

export const TopingSlice = createSlice({
    name: "toping",
    initialState,
    reducers: {
        setTopingState(
            state,
            action: PayloadAction<{
                type: "SET" | "UPDATE";
                data: Partial<TopingSliceInitialState["toping_management"]>;
            }>,
        ) {
            switch (action.payload.type) {
                case "SET": {
                    state.toping_management = {
                        ...state.toping_management,
                        ...action.payload.data,
                    };
                    break;
                }
                case "UPDATE": {
                    state.toping_management = {
                        ...state.toping_management,
                        ...action.payload.data,
                    };
                    const obj: Record<string, boolean> = {};
                    for (let key in action.payload.data) {
                        obj[key] = true;
                    }
                    state.updated_fields = {
                        ...state.updated_fields,
                        ...obj,
                    };
                    break;
                }
                default:
                    state.toping_management = {
                        id: "",
                        name: "",
                        price: 0,
                        status: StatusEnum.DRAFT,
                        image: "",
                    };
            }
        },
        setTopingUpdatedFields(
            state,
            action: PayloadAction<{
                type: keyof TopingSliceInitialState["updated_fields"] | "ALL";
                value: boolean;
            }>,
        ) {
            switch (action.payload.type) {
                case "ALL":
                    const obj: any = {};
                    for (let key in state.updated_fields) {
                        obj[key] = action.payload.value;
                    }
                    state.updated_fields = obj;
                    break;
                default:
                    state.updated_fields = {
                        ...state.updated_fields,
                        [action.payload.type]: action.payload.value,
                    };
            }
        },
        setTopingFetchingStates(
            state,
            action: PayloadAction<
                Partial<
                    Record<
                        keyof TopingSliceInitialState["fetching_states"],
                        any
                    >
                >
            >,
        ) {
            state.fetching_states = {
                ...state.fetching_states,
                ...action.payload,
            };
        },
        setTopingCategory(
            state,
            action: PayloadAction<TCategorySelectorPayload>,
        ) {
            state.category = action.payload;
        },
    },
});

export const {
    setTopingState,
    setTopingFetchingStates,
    setTopingCategory,
    setTopingUpdatedFields,
} = TopingSlice.actions;
