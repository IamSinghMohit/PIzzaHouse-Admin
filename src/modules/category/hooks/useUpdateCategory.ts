import { successToast} from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategorySchema, TCategorySchema } from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function updateCategory(data: any): Promise<TCategorySchema> {
    return await makeRequest(
        {
            url: "/category/admin/update",
            method: "PATCH",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data,
        },
        CategorySchema
    );
}

export function useUpdateCategory() {
    const qeryClient = useQueryClient();
    return useMutation<TCategorySchema, TBackendErrorReponse, any>({
        mutationKey: ["category", "update"],
        mutationFn: updateCategory,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["category"],
            });
            successToast("category updated");
        },
    });
}
