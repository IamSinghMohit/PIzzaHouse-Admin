import { StatusEnum } from "@/modules/types/inex";
import { BaseResponseWithNameAndImage } from "@/schema";
import { z, TypeOf } from "zod";

export const ProductSchema = z
    .object({
        price: z.number(),
        description: z.string(),
        featured: z.boolean(),
        sections: z.array(z.string()),
        category: z.string(),
        default_attributes: z.string(),
        status: z.enum([StatusEnum.DRAFT, StatusEnum.PUBLISHED], {
            errorMap: (issue, ctx) => ({ message: "enum is not valid" }),
        }),
    })
    .merge(BaseResponseWithNameAndImage);


export type TProductSchema = TypeOf<typeof ProductSchema>;
