import { Card } from "@nextui-org/react";
import Chart from "react-apexcharts";

type Props = {
    className?:string;
};

function IncomeAreaChart({className}: Props) {
    return (
        <Card shadow="sm" radius="sm" className={className}>
            <Chart
                options={{
                    colors: ["#FE8D0D","#FE550D"],
                    title: {
                        text: "Revenue",
                        align: "left",
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "smooth",
                    },
                    xaxis: {
                        type: "datetime",
                        categories: [
                            "2018-09-19T00:00:00.000Z",
                            "2018-09-19T01:30:00.000Z",
                            "2018-09-19T02:30:00.000Z",
                            "2018-09-19T03:30:00.000Z",
                            "2018-09-19T04:30:00.000Z",
                            "2018-09-19T05:30:00.000Z",
                            "2018-09-19T06:30:00.000Z",
                        ],
                    },
                    tooltip: {
                        x: {
                            format: "dd/MM/yy HH:mm",
                        },
                    },
                }}
                series={[
                    {
                        name: "series1",
                        data: [31, 40, 28, 51, 42, 109, 100],
                    },
                    {
                        name: "series2",
                        data: [11, 32, 45, 32, 34, 52, 41],
                    },
                ]}
                type="area"
                height="300"
            />
        </Card>
    );
}

export default IncomeAreaChart;
