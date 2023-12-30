import TopingBar from "./components/TopingBar";
import TopingTable from "./components/table";

interface Props {}

function Topings({}: Props) {
    return (
        <>
            <TopingBar />
            <TopingTable/>   
        </>
    );
}

export default Topings;
