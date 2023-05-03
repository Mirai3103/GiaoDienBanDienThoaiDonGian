import {
    Box,
    Flex,
    HoverCard,
    Text,
    Image,
    Table,
    Tabs,
    TabsProps,
    Title,
    rem,
    Popover,
    Button,
    ScrollArea,
    Select,
} from "@mantine/core";
import {
    IconChartLine,
    IconCoin,
    IconDevices,
    IconDots,
    IconMessageCircle,
    IconPhoto,
    IconSettings,
} from "@tabler/icons-react";
import React from "react";
import ConsumerImg from "../../assets/icons8-consumer-66.png";
import EmployeeImg from "../../assets/icons8-employee-64.png";
import ProductImg from "../../assets/icons8-phone-64.png";
import ProviderImg from "../../assets/icons8-factory-50.png";
import { DateInput } from "@mantine/dates";
import { AiOutlineClear } from "react-icons/ai";
const GeneralCard = ({ title, value, Icon, color }: any) => {
    return (
        <Flex
            className="rounded-lg"
            bg={`${color}.1`}
            w={"200px"}
            h={"200px"}
            direction={"column"}
            justify={"center"}
            align={"center"}
            rowGap={"sm"}
        >
            <Box mb={"md"} bg={`${color}.7`} p={"sm"} className="rounded-full">
                <Image width={40} height={40} src={Icon} />
            </Box>
            <Title fw={"bolder"} color={`${color}.8`} order={2}>
                {value}
            </Title>
            <Title color={`${color}.6`} order={4}>
                {title}
            </Title>
        </Flex>
    );
};

export default function GeneralTab() {
    const chartRef = React.useRef(null);
    React.useEffect(() => {
        if (chartRef.current) {
            (chartRef.current as any).canvas.style.width = "80%";
            (chartRef.current as any).canvas.style.height = "80%";
            (chartRef.current as any).canvas.style.marginLeft = "10%";
        }
    }, []);
    return (
        <Tabs.Panel value="general" my={"lg"} mx={"lg"}>
            <Title order={2} my={"xs"} ml={"-20px"}>
                Tổng:
            </Title>
            <Flex justify={"space-evenly"}>
                <GeneralCard title="Sản phẩm" value="300" Icon={ProductImg} color="teal" />
                <GeneralCard title="Nhân viên" value="12" Icon={EmployeeImg} color="cyan" />

                <GeneralCard title="Khách hàng" value="56" Icon={ConsumerImg} color="indigo" />

                <GeneralCard title="Nhà cung cấp" value="40" Icon={ProductImg} color="yellow" />
            </Flex>
            <div className="flex justify-between">
                <Line options={options} ref={chartRef} data={data} />
            </div>
            <Title order={2} my={"xs"} ml={"-20px"}>
                Chi tiết:
            </Title>
            <Flex align={"center"} my={"lg"}>
                <Flex className="grow" justify={"space-between"}>
                    <Select
                        data={[
                            { label: " bán hàng", value: "sale" },
                            { label: " nhập hàng", value: "import" },
                        ]}
                        label="Loại hoá đơn"
                        defaultValue={"sale"}
                        w={"150px"}
                    />
                    <DateInput w={"150px"} label="Từ ngày" placeholder="Từ ngày" defaultValue={new Date()} />
                    <DateInput w={"150px"} label="Đến ngày" placeholder="Đến ngày" defaultValue={new Date()} />
                    <Select
                        data={[
                            { label: "Iphone 12", value: "iphone12" },
                            { label: "Iphone 11", value: "iphone11" },
                        ]}
                        label="lọc theo sản phẩm"
                        placeholder="lọc theo sản phẩm"
                        w={"150px"}
                    />
                    <Select
                        data={[
                            { label: "Iphone 12", value: "iphone12" },
                            { label: "Iphone 11", value: "iphone11" },
                        ]}
                        label="lọc theo nhân viên"
                        placeholder="lọc theo nhân viên"
                        w={"150px"}
                    />
                    <Select
                        data={[
                            { label: "Iphone 12", value: "iphone12" },
                            { label: "Iphone 11", value: "iphone11" },
                        ]}
                        label="lọc theo khách hàng"
                        placeholder="lọc theo khách hàng"
                        w={"150px"}
                    />
                    <Button mt={"sm"} color="teal" leftIcon={<AiOutlineClear size={24} />}></Button>
                </Flex>
            </Flex>
            <ScrollArea h={500}>
                <Table>
                    <thead>
                        <tr>
                            <th>Mã hoá đơn</th>
                            <th>Tên nhân viên</th>
                            <th>Khách hàng</th>
                            <th>Danh sách sản phẩm</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((invoice) => (
                            <tr>
                                <td>{invoice.id}</td>
                                <td>{invoice.employee}</td>
                                <td>{invoice.customer}</td>
                                <td>
                                    <Popover width={500} shadow="md">
                                        <Popover.Target>
                                            <Button size="xs" leftIcon={<IconDots />} color="teal" variant="outline">
                                                Chi tiết
                                            </Button>
                                        </Popover.Target>
                                        <Popover.Dropdown>
                                            <Text size="sm">
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Số lượng</th>
                                                            <th>Đơn giá</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {invoice.products.map((product) => (
                                                            <tr>
                                                                <td>{product.name}</td>
                                                                <td>{product.quantity}</td>
                                                                <td>{product.price}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </Text>
                                        </Popover.Dropdown>
                                    </Popover>
                                </td>
                                <td>{invoice.total}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}>Tổng</td>
                        </tr>
                        <tr>
                            <td>17</td>
                            <td>17</td>
                            <td>17</td>
                            <td></td>
                            <td>30.000.000đ</td>
                        </tr>
                    </tfoot>
                </Table>
            </ScrollArea>
        </Tabs.Panel>
    );
}

interface IInvoice {
    id: string;
    employee: string;
    customer: string;
    products: {
        name: string;
        quantity: number;
        price: number;
    }[];
    total: number;
}

const temp: IInvoice[] = [
    {
        id: "HD001",
        employee: "Nguyễn Văn A",
        customer: "Nguyễn Văn B",
        products: [
            {
                name: "Iphone 12",
                quantity: 1,
                price: 20000000,
            },
            {
                name: "Iphone 11",
                quantity: 1,
                price: 15000000,
            },
        ],
        total: 35000000,
    },
    {
        id: "HD002",
        employee: "Lê thị C",
        customer: "Ngô Thị D",
        products: [
            {
                name: "samsung s23 ultra",
                quantity: 1,
                price: 12000000,
            },
            {
                name: "samsung s23",
                quantity: 2,
                price: 15000000,
            },
        ],
        total: 42000000,
    },
];
const mockData: IInvoice[] = [...temp, ...temp, ...temp, ...temp, ...temp, ...temp];

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTile,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTile, Tooltip, Legend);

export const options = {
    responsive: true,
    interaction: {
        mode: "index" as const,
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: "Doanh thu trong năm",
        },
    },
    scales: {
        y: {
            type: "linear" as const,
            display: true,
            position: "left" as const,
        },
    },
};

const labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
];

export const data = {
    labels,
    datasets: [
        {
            label: "Bán ra",
            data: labels.map(() => faker.datatype.number({ min: 30000, max: 500000 })),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            yAxisID: "y",
            borderColor: "rgb(53, 162, 235)",
        },
        {
            label: "Mua vào",
            data: labels.map(() => faker.datatype.number({ min: 0, max: 300000 })),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",

            yAxisID: "y",
        },
    ],
};
