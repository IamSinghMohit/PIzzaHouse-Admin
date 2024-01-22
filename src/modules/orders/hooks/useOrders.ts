import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TgetOrderSchema, getOrderSchema } from "../schema";
import { errorToast } from "@/lib/toast";

async function getOrders():Promise<TgetOrderSchema['data']> {
    try {
        const result = await axios.get("/order/admin").then((res) => res.data);
        return getOrderSchema.parse(result).data;
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
