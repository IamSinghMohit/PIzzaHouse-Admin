import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  promiseToast } from "@/lib/toast";
import { AxiosError } from "axios";
import { BackendError } from "@/types/api";

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
        (err:AxiosError<BackendError>) => `${err.response?.data.error}`
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
    });
}
