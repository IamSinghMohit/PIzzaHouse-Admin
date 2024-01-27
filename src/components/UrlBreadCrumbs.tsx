import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
interface Props {}
const ids = [
    "607cb587-6a28-4644-a422-5f369ce06cbc",
    "3c9b8d78-b5b1-439b-88b6-a9f62542d7aa",
    "ba5a74da-28f9-42c6-8d5a-2c2bda7b6ff8"
]
function UrlBreadCrumbs({}: Props) {
    const navigate = useNavigate();
    return (
        <div className="flex">
            <Breadcrumbs key={"solid"} variant={"solid"} color="primary">
                {location.pathname.split("/").map((segment,i) => (
                    <BreadcrumbItem onClick={() => navigate(segment)} key={ids[i]}>
                        {segment}
                    </BreadcrumbItem>
                ))}
            </Breadcrumbs>
        </div>
    );
}

export default  UrlBreadCrumbs;
