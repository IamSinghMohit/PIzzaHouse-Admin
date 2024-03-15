import { useQuery } from "@tanstack/react-query";
import { TGetOrderSchema, GetOrderSchema } from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function getOrders(): Promise<TGetOrderSchema > {
    return await makeRequest(
        {
            url: "order/admin",
            method: "GET",
        },
        GetOrderSchema
    );
}

export function useOrders() {
    return useQuery<TGetOrderSchema,TBackendErrorReponse>({
        queryFn: getOrders,
        queryKey: ["orders", "page=1"],
        retry:false,
    });
}
