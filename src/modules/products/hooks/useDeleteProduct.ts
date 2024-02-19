import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TGetProductsSchema } from "../schema/Get";

// type Toptions = {
//     name: string;
//     featured?: boolean;
//     status?: "Draft" | "Published" | "All";
//     min: number;
//     max: number;
//     category?: string;
// };
//
const deleteProduct = async (id: string) => {
    await axios.delete(`/product/admin/${id}`);
};
export function useDeleteProduct() {
    const queryClient = useQueryClient();
    const queryKeys = [
        "product",
    ];
    return useMutation({
        mutationKey: ["product", "delete"],
        mutationFn: deleteProduct,
        onMutate: (id: string) => {
            const prevData = queryClient.getQueryData(queryKeys) as TGetProductsSchema;
            queryClient.setQueryData(queryKeys, () => {
                return prevData.filter((pro) => {
                    if (pro.id !== id) {
                        return pro;
                    }
                });
            });
            return {
                previousData: prevData,
            };
        },
        onError: (_error, _id, context) => {
            queryClient.setQueryData(queryKeys, () => {
                return context?.previousData;
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys,
                exact: true,
            });
        },
    });
}

