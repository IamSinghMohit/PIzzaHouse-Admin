import axios from "@/lib/axios";
import { BackendError } from "@/schema/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { errorToast, promiseToast } from "@/lib/toast";

async function createCategory(data: any): Promise<string> {
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
        "some error occured"
    );
    return await promise;
}

export function useCreateCategory() {
    const qeryClient = useQueryClient();
    return useMutation({
        mutationKey: ["category", "create"],
        mutationFn: createCategory,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["category"],
            });
        },
        onError: (err: AxiosError<BackendError>) => {
            if (err.response) {
                errorToast(err.response.data.error);
            }
        },
    });
}
