import { ReactNode } from "react";
import { ErrorBoundary as Eboundary } from "react-error-boundary";

type Props = {
    children: ReactNode;
    message: string;
};

function ErrorBoundary({ children, message }: Props) {
    return (
        <Eboundary fallback={<div className="text-red-600">{message}</div>}>
            {children}
        </Eboundary>
    );
}

export default ErrorBoundary;
