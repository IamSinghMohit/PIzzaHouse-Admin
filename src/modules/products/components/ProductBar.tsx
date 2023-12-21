import { Card, CardBody, Button } from "@nextui-org/react";
import { IconCodePlus } from "@tabler/icons-react";
import { useRef } from "react";
import { TModalRef } from "@/types/Modal";
import ProductModal from "./modal/ProductModal";
import {
    ProductCategorySelector,
    ProductCheck,
    ProductPriceRange,
    ProductSearchInput,
    ProductStatusSelector,
} from "./ProductForm";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setProductFetchingStates } from "@/store/slices/product";
import AppCheck from "@/modules/shared/AppCheck";

function ProductSearchCheck() {
    const featured = useAppSelector(
        (state) => state.product.fetching_states.product_featured
    );
    const dispatch = useAppDispatch();
    return (
        <AppCheck
            text="Featured"
            checked={featured}
            onValueChange={(e) =>
                dispatch(setProductFetchingStates({ product_featured: e }))
            }
        />
    );
}

function ProductBar() {
    const ModalRef = useRef<TModalRef | null>(null);
    return (
        <Card className="mb-2" shadow="sm" radius="sm">
            <CardBody className="flex-row justify-between">
                <div className="flex gap-8 ">
                    <div className="flex flex-col gap-2">
                        <ProductSearchInput />
                        <ProductCategorySelector />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <div className="flex gap-2 items-start">
                            <ProductStatusSelector />
                            <ProductSearchCheck />
                        </div>
                        <ProductPriceRange />
                    </div>
                </div>
                <Button
                    color="primary"
                    className="text-white"
                    radius="sm"
                    endContent={<IconCodePlus />}
                    onPress={() => ModalRef.current?.onOpen()}
                >
                    Create Product
                </Button>
                <ProductModal type="Create" ref={ModalRef} />
            </CardBody>
        </Card>
    );
}

export default ProductBar;
