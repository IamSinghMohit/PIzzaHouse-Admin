import { useMutation, useQueryClient } from "@tanstack/react-query";
import { successToast } from "@/lib/toast";
import { CategorySchema, TCategorySchema } from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function createCategory(data: any): Promise<TCategorySchema> {
    return makeRequest(
        {
            url: "category/admin/create",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data,
        },
        CategorySchema,
    );
}

export function useCreateCategory() {
    const qeryClient = useQueryClient();
    return useMutation<TCategorySchema, TBackendErrorReponse, any>({
        mutationKey: ["category", "create"],
        mutationFn: createCategory,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["category"],
            });
            successToast("category created");
        },
    });
}
