import { ReactNode } from "react";
interface Props {
    className?: string;
    icon: ReactNode;
}

function IconWrapper({ className, icon }: Props) {
    return <div className={`text-2xl ${className}`}>{icon}</div>;
}

export default IconWrapper;
