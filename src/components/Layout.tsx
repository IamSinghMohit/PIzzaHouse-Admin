import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/state";
import TabList from "./Tablist";
import Navbar from "./Navbar";
import { useMediaQuery } from "react-responsive";
import UrlBreadCrumbs from "./UrlBreadCrumbs";

function Layout() {
    const { user } = useAppSelector((state) => state.user);
    const showTabList = useMediaQuery({ query: "(min-width:770px)" });

    return user ? (
        <>
            <Navbar />
            <div className="md:flex">
                {showTabList && <TabList />}
                <div className="layout bg-gray-100 p-2 py-1 flex-grow min-w-[100px] min-h-screen-nav">
                    <UrlBreadCrumbs />
                    <Outlet />
                </div>
            </div>
        </>
    ) : (
        <Navigate to="/" />
    );
}
export default Layout;
