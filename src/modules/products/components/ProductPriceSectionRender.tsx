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
import { Divider } from "@nextui-org/react";

export function DummyPriceSectionRenderer({
    data,
}: {
    data: TGetCategorySections;
}) {
    return (
        <div
            className={`flex flex-col gap-2 w-full ${
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

export function ProductPriceSectionCreate({
    shouldRenderDivider,
}: {
    shouldRenderDivider: boolean;
}) {
    const dispatch = useAppDispatch();
    let id = "";
    const category = useAppSelector((state) => state.product.current_category);
    if (category?.isSectionExists) {
        id = category.id;
    }
    const { data } = useCategoryPriceSections(id);

    useEffect(() => {
        if (data) {
            dispatch(
                setProductPriceSectionAttribute({
                    type: "SET",
                    data: data,
                }),
            );
        }
    }, [data]);

    return (
        (data?.length || 0) > 0 && (
            <>
                {shouldRenderDivider && <Divider orientation="vertical" />}
                <DummyPriceSectionRenderer data={data || []} />
            </>
        )
    );
}

function ProductPriceSectionUpdate({
    shouldRenderDivider,
}: {
    shouldRenderDivider: boolean;
}) {
    const category = useAppSelector((state) => state.product.current_category);
    const productId = useAppSelector(
        (state) => state.product.product_management.product_id,
    );
    const { data } = useProductPriceSection(productId || "");
    const { data: categorySection } = useCategoryPriceSections(
        category?.id || "",
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
                    data: categorySection,
                }),
            );
            dispatch(setDefaultProductPrices({ type: "SET", data: [] }));
            dispatch(
                setProductState({ type: "UPDATE", data: { product_price: 0 } }),
            );
        }
    }, [categorySection]);
    const propData = categorySection ? categorySection : data?.sections;
    return (
        (data?.sections.length || 0) > 0 && (
            <>
                {shouldRenderDivider && <Divider orientation="vertical" />}
                <DummyPriceSectionRenderer data={propData || []} />
            </>
        )
    );
}

function ProductPriceSectionRender({
    type,
    shouldRenderDivider,
}: {
    type: "Update" | "Create";
    shouldRenderDivider: boolean;
}) {
    return (
        <ProductContextProvider>
            {type == "Update" ? (
                <ProductPriceSectionUpdate
                    shouldRenderDivider={shouldRenderDivider}
                />
            ) : (
                <ProductPriceSectionCreate
                    shouldRenderDivider={shouldRenderDivider}
                />
            )}
        </ProductContextProvider>
    );
}

export default ProductPriceSectionRender;
