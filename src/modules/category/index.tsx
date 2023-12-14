import SearchBar from "./components/SearchBar";
import CategoryTable from "./components/tables";

interface Props {}

function Category({}: Props) {
    return (
        <>
            <SearchBar />
            <CategoryTable/>
        </>
    );
}

export default Category;
