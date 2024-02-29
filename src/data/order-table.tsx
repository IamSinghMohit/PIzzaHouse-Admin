import { IconCurrencyRupee } from "@tabler/icons-react";

export const OrderColumns = [
    {
        id: "fc67d7c7-e978-4cc7-bb29-28df2213c6f6",
        name: "IMAGE",
    },
    {
        id: "e0b5e0d3-0bd4-4bf7-aaba-3d2d30c0ee96",
        name: "ORDER ID",
    },
    {
        id: "7d56032c-bf72-47fa-9b6b-9a779ae7e2d5",
        name: "STATUS",
    },
    {
        id: "20b0cdef-afa0-4e20-9b26-9b8127144b1a",
        name: "USER",
    },
    {
        id: "724f2b51-aea4-42ac-87d2-7d92e6b8b088",
        name: (
            <span className="flex items-center">
                <IconCurrencyRupee width={16} />
                <span>PRICE</span>
            </span>
        ),
    },
    {
        id: "eea5a825-14f4-4f65-90c3-c60bd1e8136d",
        name: "STATE",
    },
    {
        id: "12d301b5-cfbb-46df-8313-e943300dbebb",
        name: "PLACED AT",
    },
];
