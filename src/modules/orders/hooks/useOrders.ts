import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TGetOrderSchema, GetOrderSchema } from "../schema";
import { ValidateBackendResponse } from "@/utils";

async function getOrders(): Promise<TGetOrderSchema | undefined> {
    return await axios
        .get("/order/admin")
        .then((res) => ValidateBackendResponse(res.data, GetOrderSchema));
}

export function useOrders() {
    return useQuery({
        queryFn: getOrders,
        queryKey: ["orders", "page=1"],
    });
}
