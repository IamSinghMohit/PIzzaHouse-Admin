type Props = {};

function CreateProductPageLoader({}: Props) {
    return (
        <div className="bg-white border p-4 rounded-lg">
            <div className="flex items-center flex-col justify-center gap-2 mb-2">
                <div className="w-[250px] h-[188px] shimmer" />
                <div className="h-12 shimmer max-w-[220px] w-1/2 min-w-[180px]" />
            </div>
            <div className="h-[100px] shimmer mb-2" />
            <div className="h-12 shimmer mb-2" />
            <div className="h-10 w-1/2 shimmer mb-2 max-w-[160px]" />
            <div className="h-10 w-full shimmer mb-2 max-w-[200px]" />
        </div>
    );
}

export default CreateProductPageLoader;
