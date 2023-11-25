import { createContext, useState, useContext } from "react";
import { ProductContextType } from "./types/context";

interface Props {
    children: React.ReactNode;
}

export const ProductContext = createContext<ProductContextType>({
    search: "",
    setSearch: () => {},
    slider: [200, 4000],
    setSlider: () => {},
    category: "",
    setCategory: () => {},
    setShowFeatured: () => {},
    showFeatured: false,
    setProductType: () => {},
    productType:'All'
});

export function useProductContext() {
    return useContext(ProductContext);
}

export function ProductContextProvider({ children }: Props) {
    const [search, setSearch] = useState("");
    const [slider, setSlider] = useState<number[]>([200, 4000]);
    const [category, setCategory] = useState("");
    const [showFeatured, setShowFeatured] = useState(false);
    const [productType, setProductType] = useState<'Draft' | 'Published'| 'All'>('All');

    return (
        <ProductContext.Provider
            value={{
                search,
                setSearch,
                slider,
                setSlider,
                category,
                setCategory,
                showFeatured,
                setShowFeatured,
                setProductType,
                productType,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
