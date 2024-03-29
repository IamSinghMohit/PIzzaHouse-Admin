import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store/store.ts";
import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchInterval: false,
            refetchOnWindowFocus: false,
            staleTime: 30000000,
            retry(failureCount, _error) {
                if (failureCount > 1) {
                    return false;
                }
                return true;
            },
            retryDelay(failureCount, _error) {
                return failureCount * 2000
            },
            refetchOnMount: false,
            refetchOnReconnect: "always",
            refetchIntervalInBackground: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </NextUIProvider>
            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    </React.StrictMode>,
);
