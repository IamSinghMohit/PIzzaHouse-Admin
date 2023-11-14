import axios from "@/lib/axios";
import { useMutation,useQueryClient} from "@tanstack/react-query";
import { promiseToast} from "@/lib/toast";

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
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["category", "delete"],
        mutationFn: deleteCategory,
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey:['category']
            })
        }
    });
}
