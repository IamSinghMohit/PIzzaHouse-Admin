export interface BackendError {
    success: boolean;
    error: {
        code: number;
        message: string;
    };
}
export interface BackendSuccess<T> {
    success: boolean;
    data: T;
}
