import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch ,useAppSelector } from "@/hooks/state";
import { setTriedToLogin ,setUser} from "@/store/slices/user";
import { useUserAutoLogin } from "@/modules/auth/hooks/userUserAutoLogin";
import { useUserLogin } from "@/modules/auth/hooks/useUserLogin";

function Login() {
    const { user, isTriedToAutoLogin } = useAppSelector((state) => state.user);
    const { isError, data: queryData } = useUserAutoLogin({
        enabled: !user && !isTriedToAutoLogin,
    });
    const { mutate, isSuccess, data } = useUserLogin({
        errCb: (err) => "hello",
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (queryData) {
            dispatch(setTriedToLogin(true));
            dispatch(setUser(queryData));
            navigate("/admin");
        }

        if (isSuccess) {
            dispatch(setUser(data));
            dispatch(setTriedToLogin(true));
            navigate("/admin");
        }

        if (user) {
            navigate("/admin");
        }
    }, [isError, isSuccess]);

    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                    />
                    <p className="text-red-500 text-xs italic">
                        Please choose a password.
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Sign In
                    </button>
                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="#"
                    >
                        Forgot Password?
                    </a>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    );
}

export default Login;