type Props = {};

function DashboardLoader({}: Props) {
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 col-span-2 gap-2">
                <div className="shimmer h-[145px]" />
                <div className="shimmer h-[145px]" />
                <div className="shimmer h-[145px]" />
                <div className="shimmer h-[145px]" />
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
