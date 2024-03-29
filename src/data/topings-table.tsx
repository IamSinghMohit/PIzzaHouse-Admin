import { IconCurrencyRupee } from "@tabler/icons-react";

export const TopingColumns = [
    {
        id:'658ec01391462083a9feb125',
        name:'IMAGE'
    },
    {
        id:'655510bd1e2da48a28041597',
        name:'NAME'
    },
    {
        id:'655510cf1e2da48a28041599',
        name:'STATUS'
    },
    {
        id:'655510d71e2da48a2804159a',
        name:'CREATED AT'
    },
    {
        id:'655510c61e2da48a28041598',
        name: (
            <span className="flex items-center">
                <IconCurrencyRupee width={16}/>
                <span>PRICE</span>
            </span>
        ),
    },
    {
        id:'655510df1e2da48a2804159b',
        name:'ACTIONS'
    },
]
