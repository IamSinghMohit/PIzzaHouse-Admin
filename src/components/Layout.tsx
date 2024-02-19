import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserAutoLogin } from "@/modules/auth/hooks/userUserAutoLogin";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setUser, setTriedToLogin } from "@/store/slices/user";
import TabList from "./Tablist";
import Navbar from "./Navbar";
import { useMediaQuery } from "react-responsive";
import UrlBreadCrumbs from "./UrlBreadCrumbs";

function Layout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, isTriedToAutoLogin } = useAppSelector((state) => state.user);

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
    const showTabList = useMediaQuery({ query: "(min-width:770px)" });
    return true ? (
        <>
            <Navbar />
            <div className="md:flex">
                {showTabList && <TabList />}
                <div className="layout bg-gray-100 p-2 py-1 flex-grow min-w-[100px] min-h-screen-nav">
                    <UrlBreadCrumbs/>
                    <Outlet />
                </div>
            </div>
        </>
    ) : null;
}
export default Layout;
