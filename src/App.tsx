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
import { Toaster } from "sonner";
import CreateProduct from "./modules/products/pages/CreateProduct";

const App = () => {
    const router = createBrowserRouter([
        {
            // path: "",
            element: <Layout />,
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
                    path: "category/:type",
                    element: <CreateCategory />,
                },
                {
                    path: "products",
                    element: <Product />,
                },
                {
                    path: "products/create",
                    element: <CreateProduct/>,
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
            <Toaster closeButton position="top-right" richColors/>
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
