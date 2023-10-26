import React, { createContext, useContext, useState } from "react";
import { ProcessedImageType } from "@/schema/ImageUploader";
import { ProductAttrType, ProductContextType } from "./schema";
import { Selection } from "@nextui-org/react";

const ProductContext = createContext<Partial<ProductContextType>>({});

export const useProductContext = (): ProductContextType => {
    return useContext(ProductContext) as ProductContextType;
};

function ProductContextProvider({ children }: { children: React.ReactNode }) {
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        url: "",
        file: "",
    });
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const [category, setCategory] =useState(''); 
    const [description, setDescription] = useState("");
    // const [attributes,setAttributes] = useState<ProductAttrType>()

    return (
        <ProductContext.Provider
            value={{
                processedImage,
                setProcessedImage,
                price,
                setPrice,
                name,
                setName,
                category,
                setCategory,
                description,
                setDescription,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContextProvider;
