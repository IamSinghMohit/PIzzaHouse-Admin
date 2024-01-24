import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth";
import Layout from "./components/Layout";
import Dashboard from "./modules/home";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SocketContextProvider } from "./socketContext";
import CategoryLoader from "./modules/category/CategoryLoader";
import CreateCategoryPage from "./modules/category/CreateCategoryPage";

const Category = lazy(() => import("./modules/category"));
// import create categoy page here
const Product = lazy(() => import("./modules/products"));
const Orders = lazy(() => import("./modules/orders"));
const Topings = lazy(() => import("./modules/topings"));
const App = () => {
    const router = createBrowserRouter([
        {
            element: (
                <SocketContextProvider>
                    {" "}
                    <Layout />
                </SocketContextProvider>
            ),
            children: [
                {
                    path: "/",
                    element: <Dashboard />,
                },
                {
                    path: "category/",
                    element: (
                        <Suspense fallback={<CategoryLoader />}>
                            <Category />
                        </Suspense>
                    ),
                },
                {
                    path: "category/create",
                    element: <CreateCategoryPage/>,
                },
                {
                    path: "products",
                    element: <Product />,
                },
                {
                    path: "topings",
                    element: <Topings />,
                },
                {
                    path: "orders",
                    element: <Orders />,
                },
            ],
        },
        {
            path: "/",
            element: <Login />,
        },
    ]);
    return (
        <div className="max-w-[1536px] mx-auto">
            <Toaster position="top-right" />
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
