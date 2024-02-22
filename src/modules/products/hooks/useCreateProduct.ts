import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/lib/toast";
import { BackendError } from "@/types/api";
import { ValidateBackendResponse } from "@/utils";
import { ProductSchema, TProductSchema } from "../schema";

async function createProduct(data: any): Promise<TProductSchema | undefined> {
    return await api
        .post("/product/admin/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => ValidateBackendResponse(res.data, ProductSchema));
}

export function useCreateProduct() {
    const qeryClient = useQueryClient();
    return useMutation({
        mutationKey: ["product", "create"],
        mutationFn: createProduct,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["product"],
            });
            successToast("product created");
        },
        onError: (error: AxiosError<BackendError>) => {
            errorToast(
                error.response?.data.error.message || "some server error"
            );
        },
    });
}
