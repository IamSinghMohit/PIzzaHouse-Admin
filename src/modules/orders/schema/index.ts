import { z, TypeOf } from "zod";

export enum OrderStatusEnum {
    PLACED = "placed",
    PREPARING = "preparing",
    OUTFORDELIVERY = "out for delivery",
    COMPLETE = "completed",
}

export const GetOrderSchema = z.object({
    success: z.boolean(),
    data: z.object({
        orders: z.array(
            z.object({
                id: z.string(),
                user_full_name: z.string(),
                image: z.string(),
                address: z.string(),
                price: z.number(),
                quantity: z.number(),
                status: z.enum(
                    [
                        OrderStatusEnum.COMPLETE,
                        OrderStatusEnum.OUTFORDELIVERY,
                        OrderStatusEnum.PREPARING,
                        OrderStatusEnum.PLACED,
                    ],
                    {
                        errorMap: () => ({
                            message: "enum is not valid",
                        }),
                    },
                ),
                state: z.string(),
                city: z.string(),
                created_at: z.string(),
                updated_at: z.string(),
            }),
        ),
        pages: z.number(),
        page: z.number(),
    }),
});

export type TGetOrderSchema = TypeOf<typeof GetOrderSchema>;
