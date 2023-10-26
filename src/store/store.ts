import {configureStore} from "@reduxjs/toolkit"
import { UserSlice } from "./features/userSlice"
import { CategorySlice } from "./features/categorySlice"
const store = configureStore({
    reducer:{
        user:UserSlice.reducer,
        category:CategorySlice.reducer
    }
})

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export default store
