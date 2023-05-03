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
import { IconDots, IconEdit, IconPlus, IconReceipt2, IconShoppingCart, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { Affix, Transition, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
const formatVietnameseMoney = (money: number) => {
    return money.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
const fakeSelectCustomer = [
    { label: "Quốc Tuấn", value: "001" },
    { label: "Ngô Hữu Hoàng", value: "002" },
    { label: "Nguyễn Văn A", value: "003" },
    { label: "Lương Minh Thế Vinh", value: "004" },
];
export default function SellerPage() {
    const [selectedProduct, setselectedProduct] = useState<any>(null);
    const [amount, setAmount] = useState(0);
    const [opened, { open, close }] = useDisclosure(false);
    const [listCart, setListCart] = useState<any[]>([]);
    const [customerSearch, setCustomerSearch] = useState("");
    return (
        <div className="px-4 pt-0">
            <Drawer position="right" opened={opened} size={"lg"} onClose={close} title="Hóa đơn">
                <Flex direction={"column"}>
                    <Flex columnGap={"lg"}>
                        <TextInput
                            contentEditable="false"
                            value={"HD001"}
                            label="Mã hóa đơn"
                            required
                            placeholder="Mã hóa đơn"
                        ></TextInput>
                        <Flex columnGap={"xs"} className="grow" align={"center"}>
                            <Select
                                className="grow"
                                searchable
                                label="Khách hàng"
                                data={fakeSelectCustomer}
                                placeholder="Tìm khách hàng theo tên hoặc mã"
                            ></Select>
                            <div>
                                <IconDots className="mt-8 cursor-pointer" />
                            </div>
                        </Flex>
                    </Flex>
                    <TextInput
                        label="Nhân viên lập"
                        required
                        placeholder="Nhân viên lập"
                        value={"Ngô Hữu Hoàng"}
                        contentEditable="false"
                    ></TextInput>
                    <Title my={"sm"} order={2}>
                        Chi tiết hóa đơn
                    </Title>
                    <Table striped highlightOnHover withBorder withColumnBorders>
                        <thead>
                            <tr>
                                <th>STT</th> <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCart.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{formatVietnameseMoney(item.price)}</td>
                                    <td>{item.amount}</td>
                                    <td>{formatVietnameseMoney(item.price * item.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Flex my={"xs"} justify={"end"}>
                        <Text weight={"bolder"} size={"lg"}>
                            Tổng tiền:{" "}
                            {formatVietnameseMoney(listCart.reduce((acc, item) => acc + item.price * item.amount, 0))}
                        </Text>
                    </Flex>
                    <Flex justify={"center"} columnGap={"sm"} className="px-4 py-2">
                        <Button size="md" leftIcon={<IconX size="1.5rem" />} color="red">
                            Xoá
                        </Button>
                        <Button
                            size="md"
                            leftIcon={<IconEdit size="1.5rem" />}
                            onClick={() => {
                                setListCart((prev) => [...prev, { ...selectedProduct, amount }]);
                                close();
                            }}
                        >
                            Sửa
                        </Button>
                    </Flex>
                    <Flex className="grow mt-60" align={"end"} justify={"flex-end"} direction={"column-reverse"}>
                        <Flex justify={"center"} columnGap={"sm"} className="px-4 py-2">
                            <Button size="md" leftIcon={<IconX size="1.5rem" />} color="red">
                                Hủy
                            </Button>
                            <Button size="md" leftIcon={<IconReceipt2 size="1.5rem" />} color="green">
                                Thanh toán
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Drawer>

            <Flex className="justify-center">
                <Title>Bán hàng</Title>
            </Flex>
            <Flex className="justify-between">
                <Title order={2}>Danh sách sản phẩm</Title>
                <Button
                    size="md"
                    leftIcon={<IconShoppingCart size="1.5rem" />}
                    className="hover:scale-110 transform transition duration-300 ease-in-out"
                    onClick={open}
                >
                    Xem hoá đơn ({listCart.length})
                </Button>
            </Flex>

            <Flex mb={"xs"} justify={"center"}>
                <TextInput w={"400px"} label="Tìm kiếm" placeholder="tìm theo mã, tên sản phẩm"></TextInput>
            </Flex>
            <ScrollArea h={"340px"}>
                <Table striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>STT</th> <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Loại sản phẩm</th>
                            <th>Giá</th>
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
                        placeholder="Giá"
                        maw={"300px"}
                        label="Giá"
                        contentEditable={false}
                    ></TextInput>
                    <div></div>

                    <TextInput
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        type="number"
                        placeholder="Số lượng mua"
                        label="Số lượng mua"
                        maw={"300px"}
                        value={amount}
                    ></TextInput>
                    <Text weight={"bold"} align="end" size={"lg"} px={"xl"}>
                        Thành tiền:{" "}
                    </Text>
                    <Text weight={"bold"} color="red" size={"lg"} px={"xl"} align="left">
                        {selectedProduct?.price ? formatVietnameseMoney(selectedProduct?.price * amount) : "0 VND"}
                    </Text>
                </div>
            </Flex>
            <Flex w="100%" justify={"center"}>
                <Button
                    px={"lg"}
                    size="lg"
                    leftIcon={<IconPlus />}
                    onClick={() => {
                        if (selectedProduct) {
                            const index = listCart.findIndex((item) => item.id === selectedProduct.id);
                            if (index === -1) {
                                setListCart([...listCart, { ...selectedProduct, amount }]);
                            } else {
                                const newList = [...listCart];
                                newList[index].amount += amount;
                                setListCart(newList);
                            }
                            setselectedProduct(undefined);
                            setAmount(0);
                            notifications.show({
                                title: "Thông báo",
                                message: "Thêm sản phẩm thành công",
                                color: "green",
                            });
                        } else {
                            notifications.show({
                                title: "Thông báo",
                                message: "Chưa chọn sản phẩm",
                                color: "red",
                            });
                        }
                    }}
                >
                    Thêm vào hoá đơn
                </Button>
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
