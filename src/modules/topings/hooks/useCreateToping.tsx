import { useMutation, useQueryClient } from "@tanstack/react-query";
import { successToast } from "@/lib/toast";
import { TTopingSchema, TopingSchema } from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function createToping(data: any): Promise<TTopingSchema> {
    return await makeRequest(
        {
            url: "/toping/admin/create",
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        TopingSchema
    );
}

export function useCreateToping() {
    const queryClient = useQueryClient();
    return useMutation<TTopingSchema, TBackendErrorReponse, any>({
        mutationKey: ["toping", "create"],
        mutationFn: createToping,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["toping"],
            });
            successToast("toping  created");
        },
    });
}
