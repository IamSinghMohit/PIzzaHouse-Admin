type Props = {};

function ProductLoader({}: Props) {
    return (
        <>
            <div className="p-2 flex justify-between bg-white rounded-md my-2">
                <div className="flex flex-wrap">
                    <div>
                        <div className="w-[250px] h-11 shimmer"></div>
                        <div className="w-[250px] h-11 shimmer"></div>
                    </div>
                    <div>
                        <div className="w-[250px] h-11 shimmer"></div>
                        <div className="w-[250px] h-11 shimmer"></div>
                    </div>
                </div>
                <div className="p-2 bg-white rounded-md">
                    <div className="w-[180px] h-11 shimmer"></div>
                </div>
            </div>
            <div className="p-2 bg-white rounded-md">
                <div className="w-full h-[540px] shimmer"></div>
            </div>
            <div className="p-2 bg-white rounded-md">
                <div className="w-[260px] h-[55px] shimmer"></div>
            </div>
        </>
    );
}

export default ProductLoader;
