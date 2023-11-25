import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSliceState } from "@/types/slice/User";
import { UserSchemaType } from "@/modules/auth/schema";

const initialState: UserSliceState = {
    user: null,
    isTriedToAutoLogin: false,
    isNavOpen: false,
};
export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserSchemaType  | undefined>) {
            if (action.payload) {
                state.user = action.payload;
            }
        },
        removeUser(state) {
            state.user = null;
        },
        setTriedToLogin(state, action: PayloadAction<boolean>) {
            state.isTriedToAutoLogin = action.payload;
        },

        setNavOpen(state) {
            state.isNavOpen = !state.isNavOpen;
        },
        mutateNavOpen(state, action: PayloadAction<boolean>) {
            state.isNavOpen = action.payload;
        },
    },
});
// export default UserSlice.reducer;
export const {
    setUser,
    removeUser,
    setTriedToLogin,
    setNavOpen,
    mutateNavOpen,
} = UserSlice.actions;
