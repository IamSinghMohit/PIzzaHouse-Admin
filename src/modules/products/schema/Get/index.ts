import { z, TypeOf } from "zod";
import { ProductSchema } from "..";

export const GetProductsSchema = z.object({
    products: z.array(ProductSchema),
    pages: z.number(),
});
export const GetProductStatsSchema = z.object({
    max_price: z.number(),
});

export const GetProductPriceSectionSchema = z.object({
    sections: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            attributes: z.array(
                z.object({
                    id: z.string(),
                    name: z.string(),
                    value: z.number(),
                }),
            ),
        }),
    ),
    default_attributes: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            section: z.string(),
        }),
    ),
});
export type TGetProductsSchema = TypeOf<typeof GetProductsSchema>;
export type TGetProductPriceSectionSchema = TypeOf<
    typeof GetProductPriceSectionSchema
>;
export type TGetProductStatsSchema = TypeOf<typeof GetProductStatsSchema>;
