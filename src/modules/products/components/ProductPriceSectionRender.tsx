import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { useCategoryPriceSections } from "@/modules/category/hooks";
import {
    setDefaultProductPrices,
    setProductPriceSectionAttribute,
    setProductState,
} from "@/store/slices/product";
import { useEffect } from "react";
import { ProductContextProvider } from "../context";
import ProductPriceInput from "./ProductPriceInput";
import { TGetCategorySections } from "@/modules/category/schema";
import { useProductPriceSection } from "../hooks/useProductPriceSection";

function DummyPriceSectionRenderer({
    data,
}: {
    data: TGetCategorySections["data"];
}) {
    return (
        <div
            className={`h-[395px] flex flex-col gap-2 ${
                data.length > 0 && "overflow-y-scroll"
            } ml-1`}
        >
            {data.map((sec) => {
                return (
                    <div key={sec.id}>
                        <h2 className="font-bold mb-1 ml-1">{sec.name}</h2>
                        <div className="flex flex-row flex-wrap gap-2">
                            {sec.attributes.map((att) => {
                                return (
                                    <ProductPriceInput
                                        attribute={att}
                                        section={sec.name}
                                        key={att.id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function ProductPriceSectionCreate() {
    const dispatch = useAppDispatch();
    const category = useAppSelector((state) => state.product.current_category);
    const { data } = useCategoryPriceSections(category.split(":")[0]);

    useEffect(() => {
        if (data) {
            dispatch(
                setProductPriceSectionAttribute({
                    type: "SET",
                    data: data.data,
                }),
            );
        }
    }, [data]);

    return <DummyPriceSectionRenderer data={data?.data || []} />;
}

function ProductPriceSectionUpdate() {
    const category = useAppSelector((state) => state.product.current_category);
    const productId = useAppSelector(
        (state) => state.product.product_management.product_id,
    );
    const { data } = useProductPriceSection(productId || "");
    const { data: categorySection } = useCategoryPriceSections(
        category.split(":")[0],
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            dispatch(
                setProductPriceSectionAttribute({
                    type: "SET_WITH_VALUE",
                    data: data.sections,
                }),
            );
            dispatch(
                setDefaultProductPrices({
                    type: "SET",
                    data: data.default_attributes,
                }),
            );
        }
    }, [data]);

    useEffect(() => {
        if (categorySection) {
            dispatch(
                setProductPriceSectionAttribute({
                    type: "SET",
                    data: categorySection.data,
                }),
            );
            dispatch(setDefaultProductPrices({ type: "SET", data: [] }));
            dispatch(
                setProductState({ type: "UPDATE", data: { product_price: 0 } }),
            );
        }
    }, [categorySection]);
    const propData = categorySection ? categorySection.data : data?.sections;
    return <DummyPriceSectionRenderer data={propData || []} />;
}

function ProductPriceSectionRender({ type }: { type: "Update" | "Create" }) {
    return (
        <ProductContextProvider>
            {type == "Update" ? (
                <ProductPriceSectionUpdate />
            ) : (
                <ProductPriceSectionCreate />
            )}
        </ProductContextProvider>
    );
}

export default ProductPriceSectionRender;
