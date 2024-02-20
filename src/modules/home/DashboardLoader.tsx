type Props = {};

function DashboardLoader({}: Props) {
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 col-span-2 gap-2">
                {[
                    "bf162a9e-d8b7-4d61-8fba-2d284e4bebd5",
                    "b077b9ab-70ac-4804-91e6-a4fa5fa52827",
                    "ecd1c9d6-db75-4a3c-9c6a-0aad7dccfe80",
                    "167f4f8a-6dc0-4eb1-9c90-a15cc807d461",
                ].map((id) => (
                    <div
                        className="h-[145px] bg-white p-4 rounded-md flex flex-col gap-2"
                        key={id}
                    >
                        <div className="flex items-center justify-between gap-2">
                            <div className="shimmer p-9" />
                            <div className="flex flex-col w-full h-full items-end gap-2">
                                <div className="shimmer h-5 w-1/2" />
                                <div className="shimmer h-5 w-1/3" />
                            </div>
                        </div>
                        <hr />
                        <div className="shimmer h-7" />
                    </div>
                ))}
            </div>
            <div className="grid  gap-2 grid-cols-1 grid-rows-3 sm:grid-rows-2 sm:grid-cols-2">
                <div className="h-[350px] shimmer" />
                <div className="h-[350px] shimmer" />
                <div className="sm:col-span-2 h-[350px]  shimmer" />
            </div>
        </div>
    );
}

export default DashboardLoader;
