import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserAutoLogin } from "@/modules/auth/hooks/userUserAutoLogin";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    setUser,
    setTriedToLogin,
} from "@/store/features/userSlice";
import TabList from "./Tablist";
import BreadCrumbs from "./BreadCrumbs";
import Navbar from "./Navbar";

function Layout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, isTriedToAutoLogin} = useAppSelector(
        (state) => state.user
    );

    const { data } = useUserAutoLogin({
        enabled: !user && !isTriedToAutoLogin,
    });

    useEffect(() => {
        if (!user && data) {
            dispatch(setUser(data));
        } else if (!user) {
            dispatch(setTriedToLogin(true));
            // navigate("/");
            console.log("not logined");
        }
    }, [data]);
    return true ? (
        <>
            <Navbar />
            <div className="flex">
                <TabList />
                <div className="layout sm:h-full p-2 pt-1 flex-grow">
                    <BreadCrumbs />
                    <Outlet />
                </div>
            </div>
        </>
    ) : null;
}
export default Layout;
