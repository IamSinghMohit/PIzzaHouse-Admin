import axios from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CategorySchemaType } from "../schema";

export function useCategory() {
    const queryClient = useQueryClient();
    const categories = queryClient.getQueryState<CategorySchemaType[]>([
        "category",
    ]);
    return useQuery({
        queryKey: ["category"],
        queryFn: async (): Promise<Array<CategorySchemaType>> =>
            await axios.get("/category").then((res) => {
                console.log('fetched category');
                return res.data
            }),
            enabled:!!!categories?.data?.length,
    });
}
