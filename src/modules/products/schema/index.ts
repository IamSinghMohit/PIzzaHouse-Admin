import { BaseResponseWithNameAndImage } from "@/schema";
import { z, TypeOf } from "zod";
import { ProductStatusEnum } from "../types";

export const ProductSchema = z
    .object({
        price: z.number(),
        description: z.string(),
        featured: z.boolean(),
        sections: z.array(z.string()),
        category: z.string(),
        default_attributes: z.string(),
        status: z.enum([ProductStatusEnum.DRAFT, ProductStatusEnum.PUBLISHED], {
            errorMap: (issue, ctx) => ({ message: "enum is not valid" }),
        }),
    })
    .merge(BaseResponseWithNameAndImage);


export type TProductSchema = TypeOf<typeof ProductSchema>;
