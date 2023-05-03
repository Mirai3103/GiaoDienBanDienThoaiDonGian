import React from "react";
import {
    Flex,
    Title,
    Text,
    Button,
    ScrollArea,
    Group,
    TextInput,
    Box,
    Table,
    Select,
    Menu,
    Divider,
} from "@mantine/core";
import {
    IconDots,
    IconFileUpload,
    IconPencil,
    IconSearch,
    IconShoppingCart,
    IconTrash,
    IconUserPlus,
} from "@tabler/icons-react";
import { SiMicrosoftexcel } from "react-icons/si";
import { DateInput } from "@mantine/dates";
import { AiOutlineClear } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import CreateConsumerModal from "./CreateConsumerModal";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
export default function ConsumerManagePage() {
    const [selectedConsumer, setselectedConsumer] = React.useState<Consumer | undefined>();
    const [opened, { open, close }] = useDisclosure(false);
    const [mode, setMode] = React.useState<"create" | "edit">("create");

    return (
        <div className="px-4 w-full h-full pt-0">
            <CreateConsumerModal opened={opened} mode={mode} close={close} consumer={selectedConsumer} />
            <Flex className="justify-center">
                <Title>Quản lý khách hàng</Title>
            </Flex>
            <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <IconSearch size={12} />
                        <Box fz={"md"} ml={5}>
                            Tìm kiếm khách hàng
                        </Box>
                    </>
                }
            />
            <Flex mx={"lg"} align={"center"} justify={"center"} columnGap={"lg"}>
                <Box display={"flex"}>
                    <Select
                        placeholder="Tìm kiếm theo"
                        data={searchOptions}
                        label="Tìm kiếm theo"
                        size="md"
                        className="grow-0 max-w-[180px]"
                    />
                    <TextInput placeholder="Nhập từ khóa" label="Nhập từ khóa" size="md" className="ml-4 grow" />
                </Box>

                <Group mt={"xs"}>
                    <Button mt={"sm"} color="teal" leftIcon={<IconSearch size={24} />}>
                        Tìm
                    </Button>
                    <Button mt={"sm"} color="teal" leftIcon={<AiOutlineClear size={24} />}>
                        Clear
                    </Button>
                </Group>
            </Flex>

            <Divider my="xs" variant="dashed" />
            <Flex justify={"space-between"} my={"xl"}>
                <Title order={2}>Danh sách khách hàng</Title>
                <Flex gap={"md"}>
                    <Button
                        size="md"
                        leftIcon={<IconUserPlus />}
                        onClick={() => {
                            setMode("create");
                            setselectedConsumer(undefined);
                            open();
                        }}
                    >
                        Thêm khách hàng{" "}
                    </Button>
                    <Button size="md" leftIcon={<SiMicrosoftexcel size={24} />}>
                        Xuất Excel{" "}
                    </Button>
                    <Button size="md" leftIcon={<IconFileUpload />}>
                        Nhập từ Excel{" "}
                    </Button>
                </Flex>
            </Flex>
            <ScrollArea h={"640px"}>
                <Table fontSize={"lg"} striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th className="font-bold">STT</th>
                            <th>Mã NV</th>
                            <th>Tên NV</th>
                            <th>Địa chỉ</th>
                            <th>SĐT</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((consumer, index) => (
                            <tr key={consumer.MaKH} onClick={() => setselectedConsumer(consumer)}>
                                <td>{index + 1}</td>
                                <td>{consumer.MaKH}</td>
                                <td>{consumer.TenKH}</td>
                                <td>{consumer.SDT}</td>
                                <td>{consumer.DiaChi}</td>
                                <td>{consumer.TrangThai === 0 ? "Ẩn" : "Hiện"}</td>
                                <td>
                                    <Menu shadow="lg">
                                        <Menu.Target>
                                            <Button variant="subtle">
                                                <IconDots />
                                            </Button>
                                        </Menu.Target>
                                        <Menu.Dropdown miw={"250px"}>
                                            <Menu.Item>
                                                <Flex
                                                    align={"center"}
                                                    onClick={() => {
                                                        setMode("edit");
                                                        setselectedConsumer(consumer);
                                                        open();
                                                    }}
                                                >
                                                    <IconPencil />
                                                    <span className="ml-2">Sửa</span>
                                                </Flex>
                                            </Menu.Item>
                                            <Menu.Item color="red">
                                                <Flex
                                                    align={"center"}
                                                    onClick={() => {
                                                        modals.openConfirmModal({
                                                            title: "Bạn có chắc chắn muốn xóa khách hàng này?",
                                                            children: (
                                                                <Text size="sm">
                                                                    Bạn có chắc chắn muốn xóa khách hàng{" "}
                                                                    {consumer.TenKH}
                                                                </Text>
                                                            ),
                                                            labels: {
                                                                confirm: "Xoá",
                                                                cancel: "Huỷ",
                                                            },
                                                            centered: true,
                                                            confirmProps: {
                                                                color: "red",
                                                            },
                                                            onCancel: () =>
                                                                notifications.show({
                                                                    message: "Đã huỷ xoá khách hàng",
                                                                    variant: "danger",
                                                                }),
                                                            onConfirm: () => notifications.show({ message: "Đã xoá" }),
                                                        });
                                                    }}
                                                >
                                                    <IconTrash />
                                                    <span className="ml-2">Xóa</span>
                                                </Flex>
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ScrollArea>
        </div>
    );
}

export interface Consumer {
    MaKH: string;
    TenKH: string;
    DiaChi: string;
    SDT: string;
    TrangThai: number;
}
const searchOptions = [
    { label: "Mã khách hàng", value: "MaKH" },
    { label: "Tên khách hàng", value: "TenKH" },
    { label: "Địa chỉ", value: "DiaChi" },
    { label: "Số điện thoại", value: "SDT" },
];
const mockData: Consumer[] = [
    {
        MaKH: "KH1",
        TenKH: "Ngô Hữu Hoàng",
        DiaChi: "TP HCM",
        SDT: "0123456789",
        TrangThai: 0,
    },
    {
        MaKH: "KH2",
        TenKH: "Nguyễn Thị An",
        DiaChi: "TP HCM",
        SDT: "0123456789",
        TrangThai: 0,
    },
    {
        MaKH: "KH3",
        TenKH: "Nguyễn Thị Bình",
        DiaChi: "TP HCM",
        SDT: "0123456789",
        TrangThai: 0,
    },
    {
        MaKH: "KH4",
        TenKH: "Nguyễn Thị B",
        DiaChi: "TP HCM",
        SDT: "0123456789",
        TrangThai: 0,
    },
    {
        MaKH: "KH5",
        TenKH: "Lê văn C",
        DiaChi: "TP HCM",
        SDT: "0123456789",
        TrangThai: 0,
    },
    {
        MaKH: "KH6",
        TenKH: "Nguyễn Thị D",
        DiaChi: "TP HCM",
        SDT: "0123456789",
        TrangThai: 0,
    },
    {
        MaKH: "KH7",
        TenKH: "Nguyễn Thị E",
        DiaChi: "TP HCM",
        SDT: "0123456789",
        TrangThai: 0,
    },
    {
        MaKH: "KH8",
        TenKH: "Nguyễn Thị F",
        DiaChi: "TP HCM",
        SDT: "0123456789",
        TrangThai: 0,
    },
    {
        MaKH: "KH9",
        TenKH: "Nguyễn Thị G",
        DiaChi: "TP HCM",
        SDT: "0123456789",
        TrangThai: 0,
    },
];
