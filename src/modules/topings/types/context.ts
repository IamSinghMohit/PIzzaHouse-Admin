import {SetStateAction,Dispatch} from "react"

export type TopingContextType = {
    slider: number[];
    setSlider: Dispatch<SetStateAction<number[]>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    topingType: 'Draft' | 'Published' | 'All';
    setTopingType: Dispatch<SetStateAction<'Draft' | 'Published' | 'All'>>;
    showFeatured: boolean;
    setShowFeatured: Dispatch<SetStateAction<boolean>>;
}