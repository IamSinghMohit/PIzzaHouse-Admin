import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setTriedToLogin, setUser } from "@/store/slices/user";
import { useUserAutoLogin } from "@/modules/auth/hooks/userUserAutoLogin";
import { useUserLogin } from "@/modules/auth/hooks/useUserLogin";
import { Button, Card, Input } from "@nextui-org/react";
import LogoImage from "@/assets/logo.svg";

function Login() {
    // const { user, isTriedToAutoLogin } = useAppSelector((state) => state.user);
    // const { isError, data: queryData } = useUserAutoLogin({
    //     enabled: !user && !isTriedToAutoLogin,
    // });
    // const { mutate, isSuccess, data } = useUserLogin({
    //     errCb: (err) => "hello",
    // });
    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     if (queryData) {
    //         dispatch(setTriedToLogin(true));
    //         dispatch(setUser(queryData));
    //         navigate("/admin");
    //     }
    //
    //     if (isSuccess) {
    //         dispatch(setUser(data));
    //         dispatch(setTriedToLogin(true));
    //         navigate("/admin");
    //     }
    //
    //     if (user) {
    //         navigate("/admin");
    //     }
    // }, [isError, isSuccess]);

    return (
        <div className="h-screen w-screen max-w-[1536px] pt-10 sm:pt-16">
            <Card
                className="flex flex-col w-[340px] justify-center p-4 pb-6 mx-auto"
                shadow="sm"
                radius="sm"
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={LogoImage}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login as admin
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <Input
                            size="sm"
                            radius="sm"
                            label="Email"
                            type="email"
                        />
                        <Input
                            size="sm"
                            radius="sm"
                            label="Password"
                            type="password"
                        />

                        <Button
                            type="submit"
                            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkOrange"
                            color="primary"
                        >
                            Login in
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default Login;

