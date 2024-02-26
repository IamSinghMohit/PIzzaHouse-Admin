import { useQuery } from "@tanstack/react-query";
import { GetProductsSchema, TGetProductsSchema } from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

type getProductsType = {
    name: string;
    featured?: boolean;
    status?: "Draft" | "Published" | "All";
    min: number;
    max: number;
    category?: string;
    limit: number;
    page: number;
};

async function getProducts(opts: getProductsType): Promise<TGetProductsSchema> {
    let url = `/product/admin/all?name=${opts.name}&min=${opts.min}&max=${opts.max}&page=${opts.page}&limit=${opts.limit}&category=${opts.category}`;

    if (opts.featured !== undefined) {
        url += `&featured=${opts.featured}`;
    }

    if (opts.status && opts.status !== "All") {
        url += `&status=${opts.status}`;
    }
    return makeRequest(
        {
            url: url,
            method: "GET",
        },
        GetProductsSchema
    );
}

export function useProducts(opts: getProductsType) {
    return useQuery<TGetProductsSchema, TBackendErrorReponse>({
        queryKey: [
            "product",
            `name=${opts.name}`,
            `min=${opts.min}&max=${opts.max}`,
            `featured=${opts.featured}`,
            `status=${opts.status}`,
            `category=${opts.category}`,
            `limit=${opts.limit}`,
            `page=${opts.page}`,
        ],
        queryFn: async () => getProducts(opts),
    });
}
