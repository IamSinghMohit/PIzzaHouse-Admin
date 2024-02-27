import { useAppSelector } from "@/hooks/state";
import { TProductUpdatedFields } from "@/store/slices/product/types";
import { useMemo, useState } from "react";
import UpdateProductButton, {
    TUpdateProductButtonProps,
} from "./UpdateProductButton";

function ToggledUpdateProductButton({
    processedImage,
    setIsLoading,
    onSuccess,
}: TUpdateProductButtonProps) {
    const { updated_fields } = useAppSelector((state) => state.product);
    const [isTrue, setIsTrue] = useState(false);
    const shouldRender = useMemo(() => {
        if (isTrue) return true;
        for (let key in updated_fields) {
            if (updated_fields[key as keyof TProductUpdatedFields]) {
                setIsTrue(true);
                return true;
            }
        }
        return false;
    }, [updated_fields]);

    return shouldRender ? (
        <UpdateProductButton
            setIsLoading={setIsLoading}
            processedImage={processedImage}
            onSuccess={onSuccess}
        />
    ) : (
        <></>
    );
}
export default ToggledUpdateProductButton;
