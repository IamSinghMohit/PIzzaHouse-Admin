import { Select, SelectItem } from "@nextui-org/react";

interface Props {
    label: string;
    items: Array<{ key: string; value: string }>;
    selectedKeys: [string];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
function StatusSelector({ label, items, selectedKeys, onChange }: Props) {
    return (
        <Select
            className="w-[160px] items-center ml-1"
            color="primary"
            label={label}
            labelPlacement="outside-left"
            radius="sm"
            variant="faded"
            selectedKeys={selectedKeys}
            onChange={onChange}
            classNames={{
                selectorIcon: "text-primaryOrange",
                base: "p-0 h-[40px]",
                innerWrapper: "p-0 ",
                mainWrapper: "p-0 h-[40px]",
                label: "font-bold",
            }}
        >
            {items.map((item) => (
                <SelectItem key={item.key} value={item.value}>
                    {item.value}
                </SelectItem>
            ))}
        </Select>
    );
}

export default StatusSelector;
