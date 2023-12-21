import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slices/user";
import { CategorySlice } from "./slices/category";
import { ProductSlice } from "./slices/product";
import { TopingSlice } from "./slices/topings";

const store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        category: CategorySlice.reducer,
        product:ProductSlice.reducer,
        toping:TopingSlice.reducer,
    },
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export default store;
