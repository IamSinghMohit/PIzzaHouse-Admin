import { useQuery } from "@tanstack/react-query";
import { GetCategoriesSchema, TGetCategoriesSchema } from "../schema";
import { TBackendErrorReponse ,makeRequest} from "@/utils";

type opts = {
    page: number;
    limit: number;
    name: string;
};

async function getCategories(
    page: number,
    limit: number,
    name: string
): Promise<TGetCategoriesSchema> {
    return (await makeRequest(
        {
            url: `/category/admin?page=${page}&limit=${limit}&name=${name}`,
            method: "GET",
        },
        GetCategoriesSchema
    )) as TGetCategoriesSchema;
}

export function useCategory({ name, page, limit }: opts) {
    return useQuery<TGetCategoriesSchema, TBackendErrorReponse>({
        queryKey: ["category", `page=${page}`, `limit=${limit}`, `name${name}`],
        queryFn: async () => getCategories(page, limit, name),
    });
}
