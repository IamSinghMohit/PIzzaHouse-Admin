import {SetStateAction,Dispatch} from "react"

export type ProductContextType = {
    slider: number[];
    setSlider: Dispatch<SetStateAction<number[]>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    productType: 'Draft' | 'Published' | 'All';
    setProductType: Dispatch<SetStateAction<'Draft' | 'Published' | 'All'>>;
    showFeatured: boolean;
    setShowFeatured: Dispatch<SetStateAction<boolean>>;
}