import { z, TypeOf } from "zod";

export interface Errors {
    title: string;
    att: string;
}

export const CategorySchema = z.object({
    id: z.string(),
    image: z.string(),
    name: z.string(),
    price_attributesId: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
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

export interface CategorySchemaType extends TypeOf<typeof CategorySchema> {}
export interface AttributeSchemaType extends TypeOf<typeof AttributeSchema> {}
