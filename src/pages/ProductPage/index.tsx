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
export default function ProductPage() {
    const [selectedProduct, setselectedProduct] = useState<any>(null);
    const [amount, setAmount] = useState(0);
    const [listCart, setListCart] = useState<any[]>([]);
    return (
        <div className="px-4 pt-0">
            <Flex className="justify-center">
                <Title>Quản lý sản phẩm</Title>
            </Flex>
            <Flex justify={"center"} gap={"md"} mt={"xs"}>
                <Button size="md" leftIcon={<IconUserPlus />}>
                    Thêm sản phẩm{" "}
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
                <Title order={2}>Danh sách sản phẩm</Title>
            </Flex>

            <Flex mb={"xs"} gap={"sm"} justify={"center"} align={"center"}>
                <fieldset className="border-2 border-gray-300 rounded-md">
                    <legend className="text-base font-medium text-gray-900">Thông tin sản phẩm</legend>
                    <TextInput w={"200px"} label="Tìm kiếm" placeholder="tìm theo mã, tên sản phẩm"></TextInput>
                </fieldset>
                <fieldset className="border-2 border-gray-300 rounded-md flex gap-3">
                    <legend className="text-base font-medium text-gray-900">số lượng tồn</legend>
                    <TextInput w={"100px"} label="Từ" placeholder="từ"></TextInput>
                    <TextInput w={"100px"} label="Đến" placeholder="đến"></TextInput>
                </fieldset>
                <fieldset className="border-2 border-gray-300 rounded-md flex gap-3">
                    <legend className="text-base font-medium text-gray-900">đơn giá </legend>
                    <TextInput w={"100px"} label="Từ" placeholder="từ"></TextInput>
                    <TextInput w={"100px"} label="Đến" placeholder="đến"></TextInput>
                </fieldset>
                <Button mt={"sm"} color="teal" leftIcon={<AiOutlineClear size={24} />}>
                    Clear
                </Button>
            </Flex>
            <ScrollArea h={"340px"}>
                <Table striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>STT</th> <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Loại sản phẩm</th>
                            <th>Giá bán</th>
                            <th>Số lượng tồn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fakeData.map((item, index) => (
                            <tr key={index} onClick={() => setselectedProduct(item)}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{formatVietnameseMoney(item.price)}</td>
                                <td>{item.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ScrollArea>
            <Flex mx={"xl"}>
                <Stack>
                    <Text>Ảnh minh họa</Text>
                    <BackgroundImage w={"200px"} h={"200px"} src={selectedProduct?.image ?? ""} />
                </Stack>
                <div className="px-12 grid grid-cols-2 w-full">
                    <TextInput
                        value={selectedProduct?.id ?? ""}
                        placeholder="Mã sản phẩm"
                        label="Mã sản phẩm"
                        contentEditable={false}
                        maw={"300px"}
                    ></TextInput>
                    <TextInput
                        value={selectedProduct?.name ?? ""}
                        placeholder="Tên sản phẩm"
                        label="Tên sản phẩm"
                        maw={"300px"}
                        contentEditable={false}
                    ></TextInput>
                    <TextInput
                        value={selectedProduct?.category ?? ""}
                        placeholder="Loại sản phẩm"
                        label="Loại sản phẩm"
                        maw={"300px"}
                        contentEditable={false}
                    ></TextInput>
                    <TextInput
                        value={selectedProduct?.price ?? ""}
                        placeholder="Giá bán"
                        maw={"300px"}
                        label="Giá  bán"
                        contentEditable={false}
                    ></TextInput>
                    <TextInput
                        value={selectedProduct?.stock ?? ""}
                        placeholder="Tồn kho"
                        maw={"300px"}
                        label="Tồn kho"
                        contentEditable={false}
                    ></TextInput>
                    <div></div>
                </div>
            </Flex>
        </div>
    );
}

const fakeData = [
    {
        name: "Iphone 14 pro max",
        category: "Apple",
        id: "SP001",
        price: 29000000,
        stock: 39,
        image: "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg",
    },
    {
        name: "Iphone 14 pro",
        category: "Apple",
        id: "SP002",
        price: 25000000,
        stock: 27,
        image: "https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-vang-thumb-600x600.jpg",
    },
    {
        name: "Samsung galaxy s23",
        category: "Samsung",
        id: "SP003",
        price: 16000000,
        stock: 12,
        image: "https://cdn.tgdd.vn/Products/Images/42/264060/samsung-galaxy-s23-600x600.jpg",
    },
    {
        name: "Samsung galaxy s23 ultra",
        category: "Samsung",
        id: "SP004",
        price: 19000000,
        stock: 5,
        image: "https://cdn.tgdd.vn/Products/Images/42/267211/Samsung-Galaxy-S21-FE-vang-1-2-600x600.jpg",
    },
    {
        name: "Xiaomi note 11",
        category: "Xiaomi",
        id: "SP005",
        price: 6000000,
        stock: 20,
        image: "https://cdn.tgdd.vn/Products/Images/42/303575/xiaomi-redmi-12c-grey-thumb-600x600.jpg",
    },
    {
        name: "Xiaomi note 10 pro",
        category: "Xiaomi",
        id: "SP006",
        price: 7900000,
        stock: 10,
        image: "https://cdn.tgdd.vn/Products/Images/42/301603/realme-c35-vang-thumb-600x600.jpg",
    },
    {
        name: "ViVo Y35",
        category: "ViVo",
        id: "SP007",
        price: 4000000,
        stock: 30,
        image: "https://cdn.tgdd.vn/Products/Images/42/283148/vivo-v25-5g-vang-thumb-1-1-600x600.jpg",
    },
    {
        name: "Oppo Reno 8",
        category: "Oppo",
        id: "SP008",
        price: 10900000,
        stock: 15,
        image: "https://cdn.tgdd.vn/Products/Images/42/301642/oppo-reno8t-vang1-thumb-600x600.jpg",
    },
    {
        name: "ViVo Y35",
        category: "ViVo",
        id: "SP009",
        price: 4000000,
        stock: 30,
        image: "https://cdn.tgdd.vn/Products/Images/42/283148/vivo-v25-5g-vang-thumb-1-1-600x600.jpg",
    },
    {
        name: "Oppo Reno 8",
        category: "Oppo",
        id: "SP010",
        price: 10900000,
        stock: 15,
        image: "https://cdn.tgdd.vn/Products/Images/42/301642/oppo-reno8t-vang1-thumb-600x600.jpg",
    },
];
