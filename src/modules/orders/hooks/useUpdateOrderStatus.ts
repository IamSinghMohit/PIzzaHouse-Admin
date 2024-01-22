import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

async function updateStatus(opts: { id: string; data: string }) {
    await axios.patch(`/order/${opts.id}`, { status: opts.data });
}
export function useUpdateOrderStatus() {
    return useMutation({
        mutationKey: ["order", "update"],
        mutationFn: (op: { id: string; data: string }) => updateStatus(op),
    });
}
