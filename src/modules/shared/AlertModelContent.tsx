import { memo } from "react";

interface Props {
    suffix: string;
    main: string;
}

function AlertModelContent({ main ,suffix}: Props) {
    return (
        <p className="text-[14px] mt-7 ml-7">
            Are you sure you want to delete {" "}
            <span className="font-bold">{main}</span> {suffix}
        </p>
    );
}

export default memo(AlertModelContent);
