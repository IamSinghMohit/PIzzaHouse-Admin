import UiModal from "@/ui/UiModal";
import { ModalRefType } from "@/schema/modal";
import { useEffect, useRef, useState } from "react";
import UiButton from "@/ui/UiButton";

interface Props {
    onYesPress: () => void;
    onNoPress: () => void;
    text: React.ReactNode;
    open: boolean;
    onClose:() => void;
}

function DeleteAlart({ onYesPress, onNoPress, text, open ,onClose}: Props) {
    const ModalRef = useRef<ModalRefType>(null);

    useEffect(() => {
        if (open) {
            ModalRef.current?.onOpen();
        } 
    }, [open]);

    return (
        <UiModal
            ref={ModalRef}
            onClose={onClose}
            footerContent={
                <>
                    <UiButton variant="application" onPress={onYesPress}>
                        Yes
                    </UiButton>
                    <UiButton
                        className="bg-red-800 text-white"
                        onPress={() => {
                            onNoPress()
                            ModalRef.current?.onClose()
                        }
                        }
                    >
                        No
                    </UiButton>
                </>
            }
        >
            <p className="text-sm mt-5 ml-2 text-black">
                {text}
            </p>
        </UiModal>
    );
}

export default DeleteAlart;
