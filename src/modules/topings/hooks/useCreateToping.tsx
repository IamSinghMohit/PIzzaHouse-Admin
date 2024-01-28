import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/lib/toast";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { BackendError } from "@/types/api";

async function createToping(data: any): Promise<string> {
    return await axios
        .post("/toping/admin/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
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
