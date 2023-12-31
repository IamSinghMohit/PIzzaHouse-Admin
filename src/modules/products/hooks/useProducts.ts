import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/lib/toast";
import { GetProductsSchema, TGetProductsSchema } from "../schema/Get";

type getProductsType = {
    name: string;
    featured?: boolean;
    status?: "Draft" | "Published" | "All";
    min: number;
    max: number;
    category?: string;
    limit: string;
    page: number;
};

async function getProducts(opts: getProductsType): Promise<TGetProductsSchema> {
    let url = `/product/admin/all?name=${opts.name}&min=${opts.min}&max=${opts.max}&page${opts.page}&limit${opts.limit}`;

    if (opts.featured !== undefined) {
        url += `&featured=${opts.featured}`;
    }

    if (opts.status && opts.status !== "All") {
        url += `&status=${opts.status}`;
    }

    if (opts.category) {
        url += `&category=${opts.category}`;
    }
    const result = await axios.get(url).then((res) => res.data);
    try {
        return GetProductsSchema.parse(result.data);
    } catch (error) {
        errorToast("received bad data from server");
        return { products: [], pages: 1 };
    }
}

export function useProducts(opts: getProductsType) {
    return useQuery({
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
