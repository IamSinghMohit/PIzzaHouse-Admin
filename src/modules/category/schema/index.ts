import { z, TypeOf } from "zod";
import React, { Dispatch, SetStateAction } from "react";
import { ProcessedImageType } from "@/schema/ImageUploader";
import { SubAttribute } from "@/schema/categorySlice";

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

export interface CategoryAttrContextType {
    processedImage: ProcessedImageType;
    setProcessedImage: Dispatch<SetStateAction<ProcessedImageType>>;
    attributes: SubAttribute[];
    setAttributes: Dispatch<SetStateAction<SubAttribute[]>>;
    chipRef: React.RefObject<HTMLInputElement>;
    chipText: string;
    setChipText:Dispatch<SetStateAction<string>>; 
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    titleRef: React.RefObject<HTMLInputElement>;
    errors: Errors;
    setErrors: Dispatch<SetStateAction<Errors>>;
    buttonRef: React.RefObject<HTMLButtonElement>;
}

export interface CategorySchemaType extends TypeOf<typeof CategorySchema> {}
export interface AttributeSchemaType extends TypeOf<typeof AttributeSchema> {}
