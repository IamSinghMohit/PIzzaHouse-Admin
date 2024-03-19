import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { useUserAutoLogin } from "@/modules/auth/hooks/userUserAutoLogin";
import { useUserLogin } from "@/modules/auth/hooks/useUserLogin";
import { Button, Card } from "@nextui-org/react";
import LogoImage from "@/assets/logo.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, TLoginFormSchema } from "./schema";
import { setTriedAutoToLogin, setUser } from "@/store/slices/user";

function Login() {
    const { user, isTriedToAutoLogin } = useAppSelector((state) => state.user);
    const { isError, data: queryData} = useUserAutoLogin({
        enabled: !user && !isTriedToAutoLogin,
    });
    const { mutate, data ,isPending} = useUserLogin();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<TLoginFormSchema>({
        defaultValues: {
            email: "admin123@gmail.com",
            password: "admin",
        },
        resolver: zodResolver(LoginFormSchema),
    });

    useEffect(() => {
        if (isError) {
            dispatch(setTriedAutoToLogin(true));
        }
        if (queryData) {
            dispatch(setUser(queryData));
            navigate("/home");
        }
        if (data) {
            dispatch(setUser(data));
            navigate("/home");
        }
    }, [isError, queryData, data]);

    function login(data: TLoginFormSchema) {
        mutate(data);
    }

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
                    <form onSubmit={handleSubmit(login)}>
                        <div className="flex flex-col items-start gap-2">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="w-full p-2 text-md outline-none bg-gray-50 border rounded-md caret-primaryOrange"
                                type="email"
                                {...register("email")}
                            />
                            <p className="text-red-500 text-sm">
                                {errors.email?.message}
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="w-full p-2 text-md outline-none bg-gray-50 border rounded-md caret-primaryOrange"
                                type="password"
                                {...register("password")}
                            />
                            <p className="text-red-500 text-sm">
                                {errors.password?.message}
                            </p>
                        </div>
                        <Button
                            type="submit"
                            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkOrange"
                            color="primary"
                            isLoading={isPending}
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
