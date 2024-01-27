import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { errorToast, successToast } from "@/lib/toast";
import { BackendError } from "@/types/api";

async function updateProduct(data:any) {
    return await axios
        .patch(`/product/admin`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
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
