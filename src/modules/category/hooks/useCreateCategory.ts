import axios from "@/lib/axios";
import { BackendError } from "@/schema/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

async function createCategory(data: any): Promise<string> {
    return await axios
        .post("/category/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
}

export function useCreateCategory() {
    const qeryClient = useQueryClient();
    return useMutation({
        mutationKey: ["category", "create"],
        mutationFn: createCategory,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["categoryes"],
            });
        },
        onError:(err:AxiosError<BackendError>) =>  {
            toast.error(err.response?.data.error);
        }
    });
}
