import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/lib/toast";
import { CategorySchema, TCategorySchema } from "../schema";
import { BackendError } from "@/types/api";
import { AxiosError } from "axios";

async function createCategory(data: any): Promise<TCategorySchema | undefined> {
    const result = await axios
        .post("/category/admin/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
    try {
        return CategorySchema.parse(result?.data);
    } catch (error) {
        console.log(error);
        throw new Error('received bad data from server')
    }
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
            successToast("category created")
        },
        onError: (error: AxiosError<BackendError>) => {
            errorToast(error.response?.data.error.message || "some error occured");
        },
    });
}
