import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./features/userSlice";
import { CategorySlice } from "./features/categorySlice";
import SearchSlice from "./features/searchSlice";
const store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        category: CategorySlice.reducer,
        search: SearchSlice.reducer,
    },
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export default store;
