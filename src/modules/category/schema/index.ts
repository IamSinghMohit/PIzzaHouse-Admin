import { ApiResWrapper } from "@/schema";
import { z, TypeOf } from "zod";

export interface Errors {
    title: string;
    att: string;
}

export const CategorySchema = z.object({
    id: z.string(),
    image: z.string(),
    name: z.string(),
    sections: z.array(z.string()),
    created_at: z.string(),
    updated_at: z.string(),
});

export const GetCategorySectionsSchema = z
    .object({
        data: z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                attributes: z.array(
                    z.object({
                        id: z.string(),
                        name: z.string(),
                    })
                ),
            })
        ),
    })
    .merge(ApiResWrapper);

export const GetCategorySchema = z
    .object({
        data: z.object({
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
            categories: z.array(CategorySchema),
        }),
    })
    .merge(ApiResWrapper);

export type TGetCategorySchema = TypeOf<typeof GetCategorySchema>;
export type TCategorySchema = TypeOf<typeof CategorySchema>;
export type TGetCategorySections = TypeOf<typeof GetCategorySectionsSchema>;
