import { BaseResponseWithNameAndImage } from "@/schema";
import { z, TypeOf } from "zod";
import { ProductStatusEnum } from "../types";

export const ProductSchema = z
    .object({
        price: z.number(),
        description: z.string(),
        featured: z.boolean(),
        price_attributes: z.array(z.string()),
        category: z.string(),
        default_prices: z.string(),
        status: z.enum([ProductStatusEnum.DRAFT, ProductStatusEnum.PUBLISHED], {
            errorMap: (issue, ctx) => ({ message: "enum is not valid" }),
        }),
    })
    .merge(BaseResponseWithNameAndImage);

export const ProductDetailsSchema = z.object({
    attributes: z.array(
        z.object({
            attribute_title: z.string(),
            attributes: z.array(
                z.object({
                    title: z.string(),
                    value: z.number(),
                })
            ),
        })
    ),
    default_prices: z.record(z.string()),
});

export interface ProductSchemaType extends TypeOf<typeof ProductSchema> {}
