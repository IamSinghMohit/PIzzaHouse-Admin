import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { errorToast, successToast } from "@/lib/toast";
import { BackendError } from "@/types/api";
import { ValidateBackendResponse } from "@/utils";
import { ProductSchema, TProductSchema } from "../schema";

async function updateProduct(data:any):Promise<TProductSchema | undefined> {
    return await axios
        .patch(`/product/admin`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => ValidateBackendResponse(res.data,ProductSchema));
}

export function useUpdateProduct() {
    const qeryClient = useQueryClient();
    return useMutation({
        mutationKey: ["product", "update"],
        mutationFn: updateProduct,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["product"],
            });
            successToast("product updated");
        },
        onError: (err: AxiosError<BackendError>) => {
            if (err.response) {
                errorToast(err.response.data.error.message);
            }
        },
    });
}
