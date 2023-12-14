import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCategorySchema, TGetCategorySchema } from "../schema";
import { errorToast } from "@/lib/toast";

type opts = {
    page: number;
    limit: number;
    name: string;
};

async function getCategories(
    page: number,
    limit: number,
    name: string
): Promise<TGetCategorySchema | undefined> {
    const result = await axios
        .get(`/category/admin?page=${page}&limit=${limit}&name=${name}`)
        .then((res) => {
            return res.data;
        });
    try {
        return GetCategorySchema.parse(result);
    } catch (error) {
        errorToast("received bad data from server");
    }
}

export function useCategory({ name, page, limit }: opts) {
    return useQuery({
        queryKey: ["category", `page=${page}`, `limit=${limit}`, `name${name}`],
        queryFn: async () => getCategories(page, limit, name),
    });
}
