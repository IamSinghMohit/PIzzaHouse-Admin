import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store/store.ts";
import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </NextUIProvider>
            <ReactQueryDevtools initialIsOpen/>
        </QueryClientProvider>
    </React.StrictMode>
);
