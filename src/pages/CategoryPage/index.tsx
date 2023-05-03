import {
    Flex,
    Text,
    RangeSlider,
    Stack,
    TextInput,
    Title,
    Table,
    ScrollArea,
    BackgroundImage,
    Button,
    Drawer,
    Select,
} from "@mantine/core";
import {
    IconDots,
    IconEdit,
    IconFileUpload,
    IconPlus,
    IconReceipt2,
    IconShoppingCart,
    IconTrash,
    IconUserPlus,
    IconX,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { Affix, Transition, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { DateTimePicker } from "@mantine/dates";
import { SiMicrosoftexcel } from "react-icons/si";
import { AiOutlineClear } from "react-icons/ai";
const formatVietnameseMoney = (money: number) => {
    return money.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
const fakeSelectCustomer = [
    { label: "Quốc Tuấn", value: "001" },
    { label: "Ngô Hữu Hoàng", value: "002" },
    { label: "Nguyễn Văn A", value: "003" },
    { label: "Lương Minh Thế Vinh", value: "004" },
];
export default function CategoryPage() {
    const [selectedProduct, setselectedProduct] = useState<any>(null);
    const [amount, setAmount] = useState(0);
    const [listCart, setListCart] = useState<any[]>([]);
    return (
        <div className="px-4 pt-0">
            <Flex className="justify-center">
                <Title>Quản lý loại sản phẩm</Title>
            </Flex>
            <Flex justify={"center"} gap={"md"} mt={"xs"}>
                <Button size="md" leftIcon={<IconUserPlus />}>
                    Thêm loại{" "}
                </Button>
                <Button color="red" size="md" leftIcon={<IconTrash />}>
                    Xóa{" "}
                </Button>
                <Button color="yellow" size="md" leftIcon={<IconEdit />}>
                    Sửa{" "}
                </Button>
                <Button color="green" size="md" leftIcon={<SiMicrosoftexcel size={24} />}>
                    Xuất Excel{" "}
                </Button>
                <Button color="green" size="md" leftIcon={<IconFileUpload />}>
                    Nhập từ Excel{" "}
                </Button>
            </Flex>
            <Flex className="justify-between">
                <Title order={2}>Danh sách loại sản phẩm</Title>
            </Flex>

            <Flex mb={"xs"} gap={"sm"} justify={"center"} align={"center"}>
                <TextInput w={"300px"} label="Tìm kiếm" placeholder="tìm theo mã, tên, mô tả của loại sản phẩm" />

                <Button mt={"sm"} color="teal" leftIcon={<AiOutlineClear size={24} />}>
                    Clear
                </Button>
            </Flex>
            <ScrollArea h={"500px"}>
                <Table striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã loại sản phẩm</th>
                            <th>Tên loại sản phẩm</th>
                            <th>Mô tả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fakeData.map((item, index) => (
                            <tr key={index} onClick={() => setselectedProduct(item)}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    {item.description.length > 100
                                        ? item.description.slice(0, 100) + "..."
                                        : item.description}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ScrollArea>
        </div>
    );
}

const fakeData = [
    {
        id: "LSP001",
        name: "Samsung",
        description:
            "Samsung là một thương hiệu điện tử, viễn thông có trụ sở đặt tại hàn Quốc, được thành lập vào năm 1938. Cho tới nay, Samsung là một trong những thương hiệu điện tử lớn trên thế giới, và là nhà sản xuất điện thoại lớn nhất trên thế giới. ",
    },
    {
        id: "LSP002",
        name: "Apple",
        description:
            "Apple là một tập đoàn công nghệ lớn của Mỹ có trụ sở chính đặt tại Cupertino, bang California. Apple được thành lập ngày 1 tháng 4 năm 1976 bởi ba nhà sáng lập là Steve Wozniak,",
    },
    {
        id: "LSP003",
        name: "Xiaomi",
        description: "xào mì",
    },
    {
        id: "LSP004",
        name: "Oppo",
        description: "hãng điện thoại lớn",
    },
    {
        id: "LSP005",
        name: "Vsmart",
        description: "hãng điện thoại lớn",
    },
    {
        id: "LSP006",
        name: "Nokia",
        description: "hãng điện thoại lớn",
    },
];
