import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/lib/toast";
import { GetProductsSchema, GetProductsSchemaType } from "../schema/Get";

type getProductsType = {
    name: string;
    featured?: boolean;
    status?: "Draft" | "Published" | "All";
    min: number;
    max: number;
    category?: string;
};

async function getProducts(
    opts: getProductsType
): Promise<GetProductsSchemaType | undefined> {
    const result = await axios
        .get(
            `/product?name=${opts.name}${
                opts.featured ? `&featured=${opts.featured}` : ""
            }${opts.status !== "All" ? `&status=${opts.status}` : ""}${
                opts.status === "All" ? "" : ""
            }&min=${opts.min}&max=${opts.max}${
                opts.category ? `&category=${opts.category}` : ""
            }`
        )
        .then((res) => {
            return res.data;
        });
    try {
        return await GetProductsSchema.parseAsync(result);
    } catch (error) {
        errorToast("received bad data from server");
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
        ],
        queryFn: async () => getProducts(opts),
    });
}
