import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { useCategoryPriceSections } from "@/modules/category/hooks";
import { setDefaultProductPrices, setProductPriceSectionAttribute } from "@/store/slices/product";
import { useEffect } from "react";
import { ProductContextProvider } from "../context";
import ProductPriceInput from "./ProductPriceInput";
import { useProductPriceSection } from "../hooks/useProductPriceSection";

function ProductPriceSectionCreate() {
    const dispatch = useAppDispatch();
    const id = useAppSelector(
        (state) => state.product.current_category_id
    );
    const { data } = useCategoryPriceSections(id.split(":")[0]);

    useEffect(() => {
        if (data) {
            dispatch(
                setProductPriceSectionAttribute({
                    type: "SET",
                    data: data.data,
                })
            );
        }
    }, [data]);
    return (
        <div
            className={`h-[395px] flex flex-col gap-2 ${
                data && "overflow-y-scroll"
            } ml-1`}
        >
            {data?.data.map((sec) => {
                return (
                    <div key={sec.id}>
                        <h2 className="font-bold mb-1 ml-1">{sec.title}</h2>
                        <div className="flex flex-row flex-wrap gap-2">
                            {sec.attributes.map((att) => {
                                return (
                                    <ProductPriceInput
                                        attribute={att}
                                        section={sec.title}
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

function ProductPriceSectionUpdate() {
    const dispatch = useAppDispatch();
    const id = useAppSelector(
        (state) => state.product.product_management.product_id
    );
    const { data } = useProductPriceSection(id || "");
    useEffect(() => {
        if (data) {
            dispatch(
                setProductPriceSectionAttribute({
                    type: "SET_FETCHED",
                    data: data.sections,
                })
            );
            // dispatch(setDefaultProductPrices({type:'SET',data:data.default_attributes}))
        }
    }, [data]);
    return (
        <div
            className={`h-[395px] flex flex-col gap-2 ${
                data && "overflow-y-scroll"
            } ml-1`}
        >
            {data?.sections.map((sec) => {
                return (
                    <div key={sec.id}>
                        <h2 className="font-bold mb-1 ml-1">{sec.name}</h2>
                        <div className="flex flex-row flex-wrap gap-2">
                            {sec.attributes.map((att) => {
                                return (
                                    <ProductPriceInput
                                        attribute={{
                                            id: att.id,
                                            title: att.attribute_title,
                                        }}
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
function ProductPriceSectionRender({ type }: { type: "Update" | "Create" }) {
    return (
        <ProductContextProvider>
            {type === "Create" ? (
                <ProductPriceSectionCreate />
            ) : (
                <ProductPriceSectionUpdate />
            )}
        </ProductContextProvider>
    );
}

export default ProductPriceSectionRender;
