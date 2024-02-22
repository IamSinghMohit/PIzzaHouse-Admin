import axios from "@/lib/axios";
import { errorToast, successToast } from "@/lib/toast";
import { BackendError } from "@/types/api";
import { ValidateBackendResponse } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TopingSchema } from "../schema";

async function updateTopoing(data: any) {
    return await axios
        .patch(`/toping/admin`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => ValidateBackendResponse(res.data,TopingSchema));
}

export function useUpdateToping() {
    const qeryClient = useQueryClient();

    return useMutation({
        mutationKey: ["toping", "update"],
        mutationFn: updateTopoing,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["toping"],
            });
            successToast("toping updated");
        },
        onError: (err: AxiosError<BackendError>) => {
            if (err.response) {
                errorToast(err.response.data.error.message);
            }
        },
    });
}
