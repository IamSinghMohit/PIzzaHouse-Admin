import { createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth";
import Layout from "./components/Layout";
import Dashboard from "./modules/home";
import { RouterProvider } from "react-router-dom";
import Category from "./modules/category";
import Product from "./modules/products";
import Topings from "./modules/topings";
import Orders from "./modules/orders";
import CreateCategory from "./modules/category/pages/CreateCategory";
import { Toaster } from "react-hot-toast";
import CreateProduct from "./modules/products/pages/CreateProduct";
import { SocketContextProvider } from "./socketContext";
import UpdateCategory from "./modules/category/pages/UpdateCategory";

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
                    path: "category",
                    element: <Category />,
                },
                {
                    path: "category/create",
                    element: <CreateCategory />,
                },
                {
                    path: "category/update",
                    element: <UpdateCategory />,
                },
                {
                    path: "products",
                    element: <Product />,
                },
                {
                    path: "products/create",
                    element: <CreateProduct />,
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
