import axios from "@/lib/axios";
import { BackendError } from "@/schema/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { promiseToast ,errorToast} from "@/lib/toast";

async function deleteCategory(args: {
    id: string;
    image: string;
}): Promise<{ message: string }> {
    const promise = axios
        .delete(`/category/delete/${args.id}/${args.image}`)
        .then((res) => res.data);
    promiseToast(
        promise,
        "deleting category",
        "Category deleted successfully",
        "Some error occured"
    );
    return await promise;
}

export function useDeleteCategory() {
    const qeryClient = useQueryClient();
    return useMutation({
        mutationKey: ["category", "delete"],
        mutationFn: deleteCategory,
        onSuccess: () => {
            qeryClient.invalidateQueries({
                queryKey: ["category"],
                exact: true,
            });
        },
        onError: (err: AxiosError<BackendError>) => {
            if (err.response) {
                errorToast(err.response.data.error);
            }
        },
    });
}
