import CategoryTable from "./components/CategoryTable";
import TopBar from "@/components/TopBar";

interface Props {}

function Category({}: Props) {
    return (
        <>
            <TopBar/>
            <CategoryTable />
        </>
    );
}

export default Category;
