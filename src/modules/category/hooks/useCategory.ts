import axios from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CategorySchemaType } from "../schema";
import { getCurrentLimit } from "@/utils";

async function getCategories(page: number, limit: number) {
    return await axios
        .get(`/category?page=${page}&limit=${limit}`)
        .then((res) => {
            console.log("fetched category");
            return res.data;
        });
}

export function useCategory(page: number) {
    const limit = getCurrentLimit()
    const queryClient = useQueryClient();
    const categories = queryClient.getQueryState<CategorySchemaType[]>(["category", `page=${page}`, `limit=${limit}`]);
    return useQuery({
        queryKey: ["category", `page=${page}`, `limit=${limit}`],
        queryFn: async () => getCategories(page, limit),
        enabled: !!!categories?.data?.length,
    });
}
