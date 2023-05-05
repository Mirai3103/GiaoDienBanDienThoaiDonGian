import React from "react";
import { Tabs, Text, Table, Stack, Flex, Group, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { faker } from "@faker-js/faker";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function ProductTab() {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (ref.current) {
            (ref.current as any).canvas.style.width = "80%";
            (ref.current as any).canvas.style.height = "80%";
            (ref.current as any).canvas.style.marginLeft = "10%";
        }
    }, []);
    return (
        <Tabs.Panel value="product" my={"lg"} mx={"lg"}>
            <Bar id="cx" data={data} options={options} ref={ref} />
            <div className="font-bold text-xl">Chi tiết </div>
            <Flex justify={"center"} gap={"xl"} align={"center"} className="my-6">
                <Flex gap={"md"}>
                    <DateInput label="Từ ngày" placeholder="Từ ngày" />
                    <DateInput label="Đến ngày" placeholder="Đến ngày" />
                </Flex>
                <Group>
                    <Button color="blue">Xem</Button>
                    <Button color="blue">Xuất Excel</Button>
                </Group>
            </Flex>
            <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>

                        <th>Tổng số lượng nhập</th>
                        <th>Tổng tiền nhập</th>
                        <th>Tổng số lượng bán</th>
                        <th>Tổng tiền bán ra</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>SP001</td>
                        <td>Iphone 14</td>
                        <td>{faker.datatype.number({ min: 3, max: 50 })}</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                        <td>{faker.datatype.number({ min: 3, max: 50 })}</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                    </tr>
                    <tr>
                        <td>SP002</td>
                        <td>SamSung s23</td>
                        <td>{faker.datatype.number({ min: 3, max: 50 })}</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                        <td>{faker.datatype.number({ min: 3, max: 50 })}</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                    </tr>
                    <tr>
                        <td>SP003</td>
                        <td>XiaoMi 13</td>
                        <td>{faker.datatype.number({ min: 3, max: 50 })}</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                        <td>{faker.datatype.number({ min: 3, max: 50 })}</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr></tr>
                </tfoot>
            </Table>
        </Tabs.Panel>
    );
}

const phoneSatistics = [
    {
        name: "Iphone 14",
        value: 40,
    },
    {
        name: "Iphone 14 Pro",
        value: 29,
    },
    {
        name: "Samsung Galaxy S23",
        value: 20,
    },
    {
        name: "Samsung Galaxy S23 Ultra",
        value: 10,
    },
    {
        name: "Samsung Z Flip 3",
        value: 18,
    },
    {
        name: "Samsung Z Fold 3",
        value: 23,
    },
    {
        name: "Xiaomi 13",
        value: 29,
    },
    {
        name: "Oppo 13",
        value: 20,
    },
    {
        name: "Vivo 13",
        value: 6,
    },
];
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Top 20 sản phẩm bán chạy nhất",
        },
    },
};

const labels = phoneSatistics.map((item) => item.name);
const data = {
    labels,
    datasets: [
        {
            label: "Số lượng (cái)",
            data: phoneSatistics.map((item) => item.value),
            backgroundColor: "rgba(53, 162, 235, 0.8)",
        },
    ],
};
