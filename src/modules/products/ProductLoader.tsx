import { TableSkaletonLoader } from "../loaders";

type Props = {};

function ProductLoader({}: Props) {
    return (
        <>
            <div className="border bg-white p-4 rounded-lg flex justify-between flex-wrap gap-3 mb-2">
                <div className="bar-grid">
                    <div className="h-14 shimmer sm:min-w-[268px]" />
                    <div className="h-14 shimmer" />
                    <div className="h-14 shimmer" />
                    <div className="h-14 shimmer" />
                </div>
                <div className="w-[157px] h-11 shimmer" />
            </div>
            <TableSkaletonLoader/>
        </>
    );
}

export default ProductLoader;
