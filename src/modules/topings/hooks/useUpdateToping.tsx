import {  successToast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TTopingSchema, TopingSchema } from "../schema";
import { TBackendErrorReponse, makeRequest } from "@/utils";

async function updateTopoing(data: any) {
    return await makeRequest(
        {
            url: `/toping/admin`,
            method: "PATCH",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data,
        },
        TopingSchema
    );
}

export function useUpdateToping() {
    const qeryClient = useQueryClient();

    return useMutation<TTopingSchema,TBackendErrorReponse,any>({
        mutationKey: ["toping", "update"],
        mutationFn: updateTopoing,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["toping"],
            });
            successToast("toping updated");
        },
    });
}
