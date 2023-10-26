import ProductBar from "./components/ProductBar";
import Apptable from "@/components/Table";
import { ProductColumns } from "@/data/product-table";

interface Props {}

function Product({}: Props) {
    return (
        <>
            <ProductBar />
            <Apptable classsName="screen" columns={ProductColumns }/>
        </>
    );
}

export default Product;