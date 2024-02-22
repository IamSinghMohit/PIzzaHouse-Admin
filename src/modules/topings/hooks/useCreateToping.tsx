import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/lib/toast";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { BackendError } from "@/types/api";
import { ValidateBackendResponse } from "@/utils";
import { TTopingSchema, TopingSchema } from "../schema";

async function createToping(data: any): Promise<TTopingSchema | undefined> {
    return await axios
        .post("/toping/admin/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => ValidateBackendResponse(res.data,TopingSchema));
}

export function useCreateToping() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["toping", "create"],
        mutationFn: createToping,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["toping"],
            });
            successToast("toping  created");
        },
        onError: (err: AxiosError<BackendError>) => {
            errorToast(
                err.response?.data.error.message || "some server error",
            );
        },
    });
}
