import axios from "@/lib/axios";
import { errorToast, successToast } from "@/lib/toast";
import { BackendError } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

async function updateTopoing(data: any) {
    return await axios
        .patch(`/toping/admin`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
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
