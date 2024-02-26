import { useAppSelector } from "@/hooks/state";
import { Ttoping_updated_fields } from "@/store/slices/topings/types";
import { useMemo, useState } from "react";
import UpdateTopingButton, { TUpdateTopingButton } from "./UpdateTopingButton";

function ToggledUpdateTopingButton({
    setIsLoading,
    processedImage,
    onSuccess,
}: TUpdateTopingButton) {
    const { updated_fields } = useAppSelector((state) => state.toping);
    const [isTrue, setIsTrue] = useState(false);
    const shouldRender = useMemo(() => {
        if (isTrue) return true;
        for (let key in updated_fields) {
            if (updated_fields[key as keyof Ttoping_updated_fields]) {
                setIsTrue(true);
                return true;
            }
        }
        return false;
    }, [updated_fields]);
    return shouldRender ? (
        <UpdateTopingButton
            setIsLoading={setIsLoading}
            processedImage={processedImage}
            onSuccess={onSuccess}
        />
    ) : (
        <></>
    );
}

export default ToggledUpdateTopingButton;
