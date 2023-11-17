import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promiseToast } from "@/lib/toast";
import { BackendError } from "@/schema/Error";

async function createProduct(data: any): Promise<string> {
    const promise = axios
        .post("/category/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
    promiseToast(
        promise,
        "creating category",
        "successfully created category",
        (err: AxiosError<BackendError>) => `${err.response?.data.error}`
    );
    return await promise;
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
        },
    });
}
