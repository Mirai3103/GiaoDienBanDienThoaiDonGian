import React from "react";
import { Tabs, Text, Title as H, Table } from "@mantine/core";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Flex, Stack, Box, Group, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
    scales: {
        xAxes: [
            {
                barPercentage: 0.4,
            },
        ],
    },
};
export const data = {
    labels: ["Ngô Hữu Hoàng", "Nguyễn A", "LMTV", "Quốc tuấn", "Nguyễn B", "Nguyễn C"],
    datasets: [
        {
            label: "Số tiền bán hàng (tr)",
            data: Array.from({ length: 6 }, () =>
                faker.datatype.number({
                    min: 1000,
                    max: 100000,
                })
            ),
            backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255,1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderColor: ["white", "white", "white", "white", "white", "white"],
            borderWidth: 1,
        },
    ],
};

export default function EmployeeTab() {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (ref.current) {
            (ref.current as any).canvas.style.width = "300px";
            (ref.current as any).canvas.style.height = "300px";
        }
    }, [ref]);
    return (
        <Tabs.Panel value="employee" my={"lg"} mx={"lg"}>
            <H order={1}>Số tiền bán hàng theo nhân viên</H>
            <Flex justify={"space-around"} align={"center"}>
                <Stack>
                    <Flex gap={"md"}>
                        <DateInput label="Từ ngày" placeholder="Từ ngày" />
                        <DateInput label="Đến ngày" placeholder="Đến ngày" />
                    </Flex>
                    <Group>
                        <Button color="blue">Xem</Button>
                        <Button color="blue">Xuất Excel</Button>
                    </Group>
                </Stack>
                <Box className="shadow-lg border p-4">
                    <Pie ref={ref} data={data} />
                </Box>
            </Flex>
            <H order={2}>Chi tiết</H>
            <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Mã nhân viên</th>
                        <th>Tên nhân viên</th>
                        <th>Tổng số hoá đơn</th>
                        <th> Tổng tiền kiếm được</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Ngô Hữu Hoàng</td>
                        <td>10</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Nguyễn A</td>
                        <td>10</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>LMTV</td>
                        <td>10</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Quốc tuấn</td>
                        <td>10</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Nguyễn B</td>
                        <td>10</td>
                        <td>{faker.datatype.number({ min: 1000, max: 1000000 })}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td className="font-bold text-xl py-4" colSpan={2}>
                            Tổng:
                        </td>
                        <td className="font-bold text-xl py-4">50 hoá đơn</td>
                        <td className="font-bold text-xl py-4">
                            {faker.datatype.number({
                                min: 1000,
                                max: 1000000,
                            })}
                            đ
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Tabs.Panel>
    );
}
