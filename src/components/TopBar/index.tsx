import { Card, CardBody ,Input} from "@nextui-org/react";
import CreateButton from "./CreateButton";
import { SearchIcon } from "@/icons";
import {useState} from"react"
import useDebounce from "@/hooks/useDebounce";

interface Props {
}

function TopBar({}: Props) {
    const [name,setName] = useState('')
    const debounceSearch = useDebounce(name,900)
    console.log("🚀 ~ file: index.tsx:13 ~ TopBar ~ debounceSearch:", debounceSearch)

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value)
    }

    return (
            <Card className="mb-2" shadow="sm">
                <CardBody className="flex-row justify-between gap-2 flex-wrap">
                    {/* <SearchField inputClassName="w-full" baseClassName="max-w-[450px] w-[250px] h-[45px] flex-grow" /> */}
                    <Input
                        label="Search"
                        endContent={<SearchIcon/>}
                        className="max-w-[300px] sm:w-[290px]"
                        value={name}
                        onChange={handleInputChange}
                        size="sm"
                        classNames={{
                            label:"text-primaryOrange"
                        }}
                    />
                    <CreateButton buttonText="Create Category" />
                </CardBody>
            </Card>
    );
}

export default TopBar;
