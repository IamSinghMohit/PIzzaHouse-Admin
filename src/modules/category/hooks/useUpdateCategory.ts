import axios from "@/lib/axios";
import { successToast, errorToast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BackendError } from "@/types/api";
import { ValidateBackendResponse } from "@/utils";
import { CategorySchema, TCategorySchema } from "../schema";

async function updateCategory(data: any): Promise<TCategorySchema | undefined> {
    return await axios
        .patch("/category/admin/update", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => ValidateBackendResponse(res.data, CategorySchema));
}

export function useUpdateCategory() {
    const qeryClient = useQueryClient();
    return useMutation({
        mutationKey: ["category", "update"],
        mutationFn: updateCategory,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["category"],
            });
            successToast("category updated");
        },
        onError: (err: AxiosError<BackendError>) => {
            if (err.response) {
                errorToast(err.response.data.error.message);
            }
        },
    });
}
