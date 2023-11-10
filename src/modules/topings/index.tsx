import AppTable from "@/components/Table";
import TopingBar from "./TopingBar";
import { TopingColumns } from "@/data/topings-table";

interface Props {}

function Topings({}: Props) {
    return (
        <>
            <TopingBar/>
            {/* <AppTable columns={TopingColumns} classsName="screen"/> */}
        </>
    );
}

export default Topings;
