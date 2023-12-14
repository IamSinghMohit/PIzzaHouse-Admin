export interface BackendError {
    success: boolean;
    error: {
        code: number;
        message: string;
    };
}
