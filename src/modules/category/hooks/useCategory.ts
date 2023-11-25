import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCategorySchema, GetCategorySchemaType } from "../schema";
import { errorToast } from "@/lib/toast";

async function getCategories(page: number, limit: number):Promise<GetCategorySchemaType | undefined> {
    const result = await axios
        .get(`/category?page=${page}&limit=${limit}`)
        .then((res) => {
            return res.data;
        });
    try {
        return GetCategorySchema.parse(result);
    } catch (error) {
        errorToast("received bad data from server");
    }
}

export function useCategory(page: number, limit: number) {
    return useQuery({
        queryKey: ["category", `page=${page}`, `limit=${limit}`],
        queryFn: async () => getCategories(page, limit),
    });
}
