import { IconSearch } from "@tabler/icons-react";
import { Input } from "@nextui-org/react";
import React from "react";

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchInput({ value, onChange }: Props) {
    return (
        <Input
            size="sm"
            type="text"
            value={value}
            onChange={onChange}
            endContent={<IconSearch width={28} height={28} />}
        />
    );
}
export default SearchInput;

