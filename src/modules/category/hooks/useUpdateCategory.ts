import axios from "@/lib/axios";
import { BackendError } from "@/schema/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

async function updateCategory(data: any): Promise<string> {
    return await axios
        .put("/category/update", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
}

export function useUpdateCategory() {
    const qeryClient = useQueryClient();
    return useMutation({
        mutationKey: ["category", "update"],
        mutationFn:  updateCategory,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["category"],
            });
            toast.success('category updated')
        },
        onError:(err:AxiosError<BackendError>) =>  {
            toast.error(err.response?.data.error);
        }
    });
}
