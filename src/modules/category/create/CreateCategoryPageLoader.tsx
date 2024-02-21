type Props = {};

function CreateCategoryPageLoader({}: Props) {
    return (
        <div className="bg-white border p-4 rounded-lg flex items-center justify-center gap-2 flex-col">
            <div className="w-[150px] h-[150px] shimmer" />
            <div className="h-12 w-[180px] shimmer" />
            <div className="h-[120px] max-w-[400px] shimmer w-full" />
            <div className="h-12 w-[100px] shimmer mx-auto" />
        </div>
    );
}

export default CreateCategoryPageLoader;
