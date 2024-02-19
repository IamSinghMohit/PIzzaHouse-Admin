import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TGetOrderSchema, GetOrderSchema } from "../schema";
import { errorToast } from "@/lib/toast";

async function getOrders():Promise<TGetOrderSchema['data']> {
    try {
        const result = await axios.get("/order/admin").then((res) => res.data);
        return GetOrderSchema.parse(result).data;
    } catch (error) {
        console.log(error)
        errorToast("Bad data received from server");
        return [];
    }
}

export function useOrders() {
    return useQuery({
        queryFn: getOrders,
        queryKey: ["orders", "page=1"],
    });
}
