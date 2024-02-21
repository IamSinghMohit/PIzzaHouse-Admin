import axios from "axios";
const url = process.env.BACKEND_URL;

const api = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(
                    `${url}auth/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                return api.request(originalRequest);
            } catch (err) {
                console.log(err);
            }
        }
        throw error;
    }
);

export default api;
