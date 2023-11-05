import React, { createContext, useContext, useState, useRef } from "react";
import { CategoryAttrContextType } from "./schema";
import { ProcessedImageType } from "@/schema/ImageUploader";
import { SubAttribute } from "@/schema/categorySlice";

const CategoryContext = createContext<Partial<CategoryAttrContextType>>({});

export const useCategoryContext = (): CategoryAttrContextType => {
    return useContext(CategoryContext) as CategoryAttrContextType;
};

function CategoryContextProvider({ children }: { children: React.ReactNode }) {
    const [attributes, setAttributes] = useState<SubAttribute[]>([]);
    // this is for chip input tag
    const chipRef = useRef<HTMLInputElement>(null);
    const [chipText, setChipText] = useState("");
    // this is for title of the category attribute
    const [title, setTitle] = useState("");
    const titleRef = useRef<HTMLInputElement>(null);
    // Errors
    const [errors, setErrors] = useState({ title: "", att: "" });

    const buttonRef = useRef<HTMLButtonElement>(null);

    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        url: "",
        file: "",
    });
    return (
        <CategoryContext.Provider
            value={{
                processedImage,
                setProcessedImage,
                attributes,
                buttonRef,
                chipRef,
                chipText,
                errors,
                setAttributes,
                setErrors,
                setTitle,
                setChipText,
                title,
                titleRef,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
}

export default CategoryContextProvider;
