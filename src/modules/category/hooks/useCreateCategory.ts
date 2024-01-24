import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast } from "@/lib/toast";
import { CategorySchema, TCategorySchema } from "../schema";

async function createCategory(data: any): Promise<TCategorySchema | null> {
    const result = await axios
        .post("/category/admin/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);
    try {
        return CategorySchema.parse(result);
    } catch (error) {
        console.log(error);
        errorToast("received bad data from server");
        return null;
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
        },
    });
}
