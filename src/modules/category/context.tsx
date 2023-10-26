import React, { createContext, useContext, useState } from "react";
import { CategoryContextType } from "./schema";
import { ProcessedImageType } from "@/schema/ImageUploader";

const CategoryContext = createContext<Partial<CategoryContextType>>(
    {}
);

export const useCategoryContext = (): CategoryContextType => {
    return useContext(CategoryContext) as CategoryContextType 
};

function CategoryContextProvider({ children }: { children: React.ReactNode }) {
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        url: "",
        file: "",
    });

    return (
        <CategoryContext.Provider value={{processedImage, setProcessedImage}}>
            {children}
        </CategoryContext.Provider>
    );
}

export default CategoryContextProvider;
