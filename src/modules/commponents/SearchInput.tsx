import { IconSearch } from '@tabler/icons-react';
import React from 'react'

type Props = {
    value:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({value,onChange}: Props) {
  return (
        <div className="rounded-md flex items-center gap1 bg-gray-100">
            <input
                type="text"
                className="p-3 bg-transparent focus:outline-none"
                value={value}
                onChange={onChange}
            />
            <button>
                <IconSearch width={20} height={20} />
            </button>
        </div>
  )
} 
export default  SearchInput
