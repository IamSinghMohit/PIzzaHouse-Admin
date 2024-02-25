import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth";
import Layout from "./components/Layout";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NotFound from "./components/NotFound";

// pages loaders
import DashboardLoader from "./modules/home/DashboardLoader";
import ProductLoader from "./modules/products/ProductLoader";
import CategoryLoader from "./modules/category/CategoryLoader";
import TopingLoader from "./modules/topings/TopingLoader";
import CreateCategoryPageLoader from "./modules/category/create/CreateCategoryPageLoader";
import ViewProductPageLoader from "./modules/products/view/ViewProductPageLoader";
import CreateProductPageLoader from "./modules/products/create/CreateProductPageLoader";
import { TableSkaletonLoader } from "./modules/loaders";
import CreateTopingPage from "./modules/topings/create/CreateTopingPage";

// pages
const CreateProductPage = lazy(
    () => import("./modules/products/create/CreateProductPage"),
);
const CreateCategoryPage = lazy(
    () => import("./modules/category/create/CreateCategoryPage"),
);
const ViewProductPage = lazy(
    () => import("./modules/products/view/ViewProductPage"),
);
const Category = lazy(() => import("./modules/category"));
const Product = lazy(() => import("./modules/products"));
const Orders = lazy(() => import("./modules/orders"));
const Topings = lazy(() => import("./modules/topings"));
const Dashboard = lazy(() => import("./modules/home"));

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
                    element: (
                        <Suspense fallback={<DashboardLoader />}>
                            <Dashboard />
                        </Suspense>
                    ),
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
                    element: (
                        <Suspense fallback={<CreateCategoryPageLoader />}>
                            <CreateCategoryPage />
                        </Suspense>
                    ),
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
                    element: (
                        <Suspense fallback={<CreateProductPageLoader />}>
                            <CreateProductPage />
                        </Suspense>
                    ),
                },
                {
                    path: "products/view",
                    element: (
                        <Suspense fallback={<ViewProductPageLoader />}>
                            <ViewProductPage />
                        </Suspense>
                    ),
                },
                {
                    path: "topings",
                    element: (
                        <Suspense fallback={<TopingLoader />}>
                            <Topings />
                        </Suspense>
                    ),
                },
                {
                    path: "topings/create",
                    element: (
                        <Suspense fallback={<TopingLoader />}>
                            <CreateTopingPage />
                        </Suspense>
                    ),
                },
                {
                    path: "orders",
                    element: (
                        <Suspense fallback={<TableSkaletonLoader />}>
                            <Orders />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "*",
            element: <NotFound />,
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
