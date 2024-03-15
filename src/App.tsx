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
import TopingPageLoader from "./modules/topings/page/TopingPageLoader";
import ErrorBoundary from "./lib/error-boundary";
import FaqPage from "./modules/faq";

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
const TopingPage = lazy(() => import("./modules/topings/page"));

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
                        <ErrorBoundary message="*Requested page is not available">
                            <Suspense fallback={<DashboardLoader />}>
                                <Dashboard />
                            </Suspense>
                        </ErrorBoundary>
                    ),
                },
                {
                    path: "categories",
                    element: (
                        <ErrorBoundary message="*Requested page is not available">
                            <Suspense fallback={<CategoryLoader />}>
                                <Category />
                            </Suspense>
                        </ErrorBoundary>
                    ),
                },
                {
                    path: "categories/create",
                    element: (
                        <ErrorBoundary message="*Requested page is not available">
                            <Suspense fallback={<CreateCategoryPageLoader />}>
                                <CreateCategoryPage />
                            </Suspense>
                        </ErrorBoundary>
                    ),
                },
                {
                    path: "products",
                    element: (
                        <ErrorBoundary message="*Requested page is not available">
                            <Suspense fallback={<ProductLoader />}>
                                <Product />
                            </Suspense>
                        </ErrorBoundary>
                    ),
                },
                {
                    path: "products/create",
                    element: (
                        <ErrorBoundary message="*Requested page is not available">
                            <Suspense fallback={<CreateProductPageLoader />}>
                                <CreateProductPage />
                            </Suspense>
                        </ErrorBoundary>
                    ),
                },
                {
                    path: "products/view",
                    element: (
                        <ErrorBoundary message="*Requested page is not available">
                            <Suspense fallback={<ViewProductPageLoader />}>
                                <ViewProductPage />
                            </Suspense>
                        </ErrorBoundary>
                    ),
                },
                {
                    path: "topings",
                    element: (
                        <ErrorBoundary message="*Requested page is not available">
                            <Suspense fallback={<TopingLoader />}>
                                <Topings />
                            </Suspense>
                        </ErrorBoundary>
                    ),
                },
                {
                    path: "topings/:id",
                    element: (
                        <ErrorBoundary message="*Requested page is not available">
                            <Suspense fallback={<TopingPageLoader />}>
                                <TopingPage />
                            </Suspense>
                        </ErrorBoundary>
                    ),
                },
                {
                    path: "orders",
                    element: (
                        <ErrorBoundary message="*Requested page is not available">
                            <Suspense fallback={<TableSkaletonLoader />}>
                                <Orders />
                            </Suspense>
                        </ErrorBoundary>
                    ),
                },
            ],
        },
        {
            path: "/faq",
            element: <FaqPage />,
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
