import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast} from "@/lib/toast";
import { BackendError } from "@/types/api";

async function createProduct(data: any): Promise<string> {
    return await axios
        .post("/product/admin/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
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
            successToast("product created")
        },
        onError:(error:AxiosError<BackendError>) => {
            errorToast(error.response?.data.error.message || "some server error")
        }
    });
}
