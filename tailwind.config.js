/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:{
                primaryOrange:'#FE8D0D',
                darkOrange:'#E27C09',
                primaryBalck:'#101010',
                secondaryBlack:'#282828',
                primaryRed:'#FE550D',
                beforeColor:'rgba(255, 147, 67, 0.11)',
                primaryOrangeAlpha:'rgba(254, 129, 11, 0.46)',
            },
            screens:{
                'xs':'450px'
            }
        },
    },
    plugins: [nextui({
        themes:{
            light:{
                colors:{
                    primary:"#FE8D0D"
                }
            }
        }
    })],
};
