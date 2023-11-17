import { z, TypeOf } from "zod";

export interface Errors {
    title: string;
    att: string;
}

export const ApiResWrapper = z.object({});

export const CategorySchema = z.object({
    id: z.string(),
    image: z.string(),
    name: z.string(),
    price_attributes: z.array(z.string()),
    created_at: z.string(),
    updated_at: z.string(),
});

export const AttributeSchema = z.array(
    z.object({
        id: z.string(),
        attribute_title: z.string(),
        categoryId: z.string(),
        attributes: z.array(
            z.object({
                id: z.string(),
                title: z.string(),
            })
        ),
    })
);

export const GetCategorySchema = z.object({
    page: z.union([z.number(), z.string()]).transform((data) => {
        if (typeof data == "string") {
            return parseInt(data);
        } else {
            return data;
        }
    }),
    pages: z.union([z.number(), z.string()]).transform((data) => {
        if (typeof data == "string") {
            return parseInt(data);
        } else {
            return data;
        }
    }),
    data: z.array(CategorySchema),
});

export type GetCategorySchemaType = TypeOf<typeof GetCategorySchema>;
export type CategorySchemaType = TypeOf<typeof CategorySchema>;
export type AttributeSchemaType = TypeOf<typeof AttributeSchema>;
