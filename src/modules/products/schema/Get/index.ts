import { z, TypeOf } from "zod";
import { ProductSchema, ProductDetailsSchema } from "..";

export const GetProductsSchema = z.object({
    data: z.array(ProductSchema),
});
export const GetProductDetailsSchema = z.object({
    data: ProductDetailsSchema,
});

export type GetProductsSchemaType = TypeOf<typeof GetProductsSchema>;
export type GetProductDetailsSchemaType = TypeOf<
    typeof GetProductDetailsSchema
>;
