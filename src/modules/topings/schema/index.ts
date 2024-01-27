import { StatusEnum } from "@/modules/types/inex";
import { z, TypeOf } from "zod";

export const TopingSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    image: z.string(),
    status: z.enum([StatusEnum.DRAFT, StatusEnum.PUBLISHED], {
        errorMap: (issue, ctx) => ({ message: "enum is not valid" }),
    }),
    category: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});
export const GetTopingsSchema = z.object({
    topings: z.array(TopingSchema),
    pages: z.number(),
});

export const GetTopingStats = z.object({
    success: z.boolean(),
    data: z.object({
        max_price: z.number(),
    }),
});

export type TGetTopingsSchema = TypeOf<typeof GetTopingsSchema>;
export type TTopingSchema = TypeOf<typeof TopingSchema>;
export type TGetTopingStats = TypeOf<typeof GetTopingStats>;
