import React from "react";
import { CheveronRight } from "@/icons";
import { Link } from "react-router-dom";
interface Props {}

function BreadCrumbs({}: Props) {
    return (
        <div className="flex">
            {location.pathname.split("/").map((segment, index, array) => (
                <React.Fragment key={segment}>
                    {index > 0 && (
                        <span className="text-darkOrange">
                            <CheveronRight />
                        </span>
                    )}
                    <Link to={segment}>
                        <span
                            className={`uppercase ${
                                array.length <= index + 1 &&
                                "text-primaryOrange"
                            }`}
                        >
                            {segment}
                        </span>
                    </Link>
                </React.Fragment>
            ))}
        </div>
    );
}

export default BreadCrumbs;
