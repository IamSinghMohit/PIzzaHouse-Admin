import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth";
import Layout from "./components/Layout";
import Dashboard from "./modules/home";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import CategoryLoader from "./modules/category/CategoryLoader";
import CreateCategoryPage from "./modules/category/CreateCategoryPage";
import ProductLoader from "./modules/products/ProductLoader";

import CreateProductPage from "./modules/products/CreateProductPage";
import ViewProductPage from "./modules/products/ViewProductPage";
import Category from "./modules/category";
import Product from "./modules/products";
import Orders from "./modules/orders";
import Topings from "./modules/topings";
import DashboardLoader from "./modules/home/DashboardLoader";

// const Category = lazy(() => import("./modules/category"));
// const Product = lazy(() => import("./modules/products"));
// const Orders = lazy(() => import("./modules/orders"));
// const Topings = lazy(() => import("./modules/topings"));

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            element: <Layout />,
            children: [
                {
                    path: "home",
                    element: <DashboardLoader/>,
                },
                {
                    path: "categories",
                    element: (
                        <Suspense fallback={<CategoryLoader />}>
                            <Category />
                        </Suspense>
                    ),
                },
                {
                    path: "categories/create",
                    element: <CreateCategoryPage />,
                },
                {
                    path: "products",
                    element: (
                        <Suspense fallback={<ProductLoader />}>
                            <Product />
                        </Suspense>
                    ),
                },
                {
                    path: "products/create",
                    element: <CreateProductPage />,
                },
                {
                    path: "products/view",
                    element: <ViewProductPage />,
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
    ]);
    return (
        <div className="max-w-[1536px] mx-auto">
            <Toaster position="top-right" />
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
