import { ErrorBoundary } from "react-error-boundary";
import Error from "./Error";

interface Props {
    text: string;
    children: React.ReactNode;
}

function ErrorWrapper({ text, children }: Props) {
    return (
        <ErrorBoundary
            fallback={<Error text={text}/>}
        >
            {children}
        </ErrorBoundary>
    );
}

export default ErrorWrapper;