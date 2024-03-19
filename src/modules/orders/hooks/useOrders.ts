import { useQuery } from "@tanstack/react-query";
import { TGetOrderSchema, GetOrderSchema } from "../schema";
import { TBackendErrorReponse, ValidateBackendResponse } from "@/utils";
import api from "@/lib/axios";

type TOpts = {
    page: number;
    limit: number | string;
};
export function useOrders({ page, limit }: TOpts) {
    return useQuery<TGetOrderSchema, TBackendErrorReponse>({
        queryKey: ["orders", `page=${page}`, `limit=${limit}`],
        queryFn: async () =>
            await api.get("order/admin").then((res) => res.data),
        select: (data) => {
            return ValidateBackendResponse(data, GetOrderSchema);
        },
    });
}
