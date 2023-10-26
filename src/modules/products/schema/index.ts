import { ProcessedImageType } from "@/schema/ImageUploader";
import { Dispatch, SetStateAction } from "react";

export interface ProductContextType {
    processedImage: ProcessedImageType;
    setProcessedImage: Dispatch<SetStateAction<ProcessedImageType>>;
    price: number;
    setPrice: Dispatch<SetStateAction<number>>;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
}

export interface ProductSubAttrType {
    title: string;
    value: number;
}
export interface ProductAttrType {
    attribute_title: string;
    attributes: Array<ProductSubAttrType>;
}
export interface ProductTypeType {
    name: string;
    category: string;
    price: number;
    description: string;
    status: "draf" | "published";
    price_attributes: Array<ProductAttrType>;
}
