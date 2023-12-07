import { createContext, useState, useContext } from "react";
import { TopingContextType } from "./types/context";

interface Props {
    children: React.ReactNode;
}

export const TopingContext = createContext<TopingContextType>({
    search: "",
    setSearch: () => {},
    slider: [200, 4000],
    setSlider: () => {},
    category: "",
    setCategory: () => {},
    setShowFeatured: () => {},
    showFeatured: false,
    setTopingType: () => {},
    topingType: "All",
});

export function useTopingContext() {
    return useContext(TopingContext);
}

export function TopingContextProvider({ children }: Props) {
    const [search, setSearch] = useState("");
    const [slider, setSlider] = useState<number[]>([200, 4000]);
    const [category, setCategory] = useState("");
    const [showFeatured, setShowFeatured] = useState(false);
    const [topingType, setTopingType] = useState<"Draft" | "Published" | "All">(
        "All"
    );

    return (
        <TopingContext.Provider
            value={{
                search,
                setSearch,
                slider,
                setSlider,
                category,
                setCategory,
                showFeatured,
                setShowFeatured,
                setTopingType,
                topingType,
            }}
        >
            {children}
        </TopingContext.Provider>
    );
}
