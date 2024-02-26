type Props = {};

function TopingPageLoader({}: Props) {
    return (
        <div className="bg-white border p-4 rounded-lg">
            <div className="flex flex-col items-center justify-center gap-2 mb-2">
                <div className="w-[180px] h-[180px] shimmer" />
                <div className="h-12 shimmer max-w-[220px] w-1/2 min-w-[180px]" />
            </div>
            <div className="flex flex-col justify-start gap-2">
            <div className="h-[100px] w-full shimmer" />
            <div className="h-12 shimmer w-full min-w-[180px]" />
                <div className="h-10 w-1/2 shimmer max-w-[160px]" />
                <div className="h-10 w-full shimmer max-w-[200px]" />
            </div>
        </div>
    );
}

export default TopingPageLoader;
