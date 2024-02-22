import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCategoriesSchema, TGetCategoriesSchema } from "../schema";
import { ValidateBackendResponse } from "@/utils";

type opts = {
    page: number;
    limit: number;
    name: string;
};

async function getCategories(
    page: number,
    limit: number,
    name: string
): Promise<TGetCategoriesSchema | undefined> {
    return await axios
        .get(`/category/admin?page=${page}&limit=${limit}&name=${name}`)
        .then((res) => ValidateBackendResponse(res.data, GetCategoriesSchema));
}

export function useCategory({ name, page, limit }: opts) {
    return useQuery({
        queryKey: ["category", `page=${page}`, `limit=${limit}`, `name${name}`],
        queryFn: async () => getCategories(page, limit, name),
    });
}
