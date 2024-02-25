import { StatusEnum } from "@/modules/types/inex";
import { BaseResponseWithNameAndImage } from "@/schema";
import { z, TypeOf } from "zod";

export const TopingSchema = z
    .object({
        price: z.number(),
        status: z.enum([StatusEnum.DRAFT, StatusEnum.PUBLISHED], {
            errorMap: () => ({ message: "enum is not valid" }),
        }),
        categories: z.array(z.string()),
    })
    .merge(BaseResponseWithNameAndImage);

export const GetTopingsSchema = z.object({
    topings: z.array(TopingSchema),
    pages: z.number(),
    page: z.number(),
});

export const GetTopingStatsShchema = z.object({
    max_price: z.number(),
});

export type TGetTopingsSchema = TypeOf<typeof GetTopingsSchema>;
export type TTopingSchema = TypeOf<typeof TopingSchema>;
export type TGetTopingStatsShchema = TypeOf<typeof GetTopingStatsShchema >;
