import { TableSkaletonLoader } from "../loaders";

type Props = {};

function CategoryLoader({}: Props) {
    return (
        <>
            <div className="border p-2 flex justify-between bg-white rounded-lg my-2 flex-wrap">
                <div className="w-[250px] h-11 shimmer"></div>
                <div className="w-[180px] h-11 shimmer"></div>
            </div>
            <TableSkaletonLoader/>
        </>
    );
}

export default CategoryLoader;
