import { RefObject, createContext, useContext, useRef } from "react";

type ProductContextValue = {
    InputRef: React.MutableRefObject<{
        [key: string]: HTMLInputElement | null;
    }>;
    inputIdArrayRef : React.MutableRefObject<string[]>;
};


const ProductContext = createContext<ProductContextValue | null>(null);

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if(!context){
         throw new Error('This element cannot be rendered outside of ProductContext')
    }
    return context
};

export function ProductContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const InputRef = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const inputIdArrayRef = useRef<string[]>([]);
    console.log("context run!!!");
    return (
        <ProductContext.Provider value={{ InputRef, inputIdArrayRef  }}>
            {children}
        </ProductContext.Provider>
    );
}
