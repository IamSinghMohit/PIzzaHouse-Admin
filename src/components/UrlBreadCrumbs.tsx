import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
interface Props {}

function UrlBreadCrumbs({}: Props) {
    const navigate = useNavigate();
    return (
        <div className="flex">
            <Breadcrumbs key={"solid"} variant={"solid"} color="primary">
                {location.pathname.split("/").map((segment) => (
                    <BreadcrumbItem onClick={() => navigate(segment)}>
                        {segment}
                    </BreadcrumbItem>
                ))}
            </Breadcrumbs>
        </div>
    );
}

export default  UrlBreadCrumbs;
