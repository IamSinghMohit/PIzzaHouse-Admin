import axios from "@/lib/axios";
import { successToast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";

const deleteProduct = async (id:string) => {
    if(id.length <= 0) return
    await axios.delete(`/product/admin/${id}`)
}
export function useDeleteProduct(){
    return useMutation({
        mutationKey:['product','delete'] ,
        mutationFn:(id:string) => deleteProduct(id),
        onSuccess:() => {
            successToast('product deleted successfully')
        }
    })
}