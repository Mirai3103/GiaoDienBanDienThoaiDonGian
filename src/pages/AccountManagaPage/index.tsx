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
import CreateAccountModal from "./CreateAccountModal";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
export default function AccountManagePage() {
    const [selectedAccount, setselectedAccount] = React.useState<Account | undefined>();
    const [opened, { open, close }] = useDisclosure(false);
    const [mode, setMode] = React.useState<"create" | "edit">("create");

    return (
        <div className="px-4 w-full h-full pt-0">
            <CreateAccountModal opened={opened} mode={mode} close={close} account={selectedAccount} />
            <Flex className="justify-center">
                <Title>Quản lý tài khoản</Title>
            </Flex>
            <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <IconSearch size={12} />
                        <Box fz={"md"} ml={5}>
                            Tìm kiếm tài khoản
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
                <Title order={2}>Danh sách tài khoản</Title>
                <Flex gap={"md"}>
                    <Button
                        size="md"
                        leftIcon={<IconUserPlus />}
                        onClick={() => {
                            setMode("create");
                            setselectedAccount(undefined);
                            open();
                        }}
                    >
                        Thêm tài khoản{" "}
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

                            <th>Tên tài khoản</th>
                            <th>Mật khẩu</th>
                            <th>Mã nhân viên</th>
                            <th>Quyền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((consumer, index) => (
                            <tr key={consumer.TenTK} onClick={() => setselectedAccount(consumer)}>
                                <td>{index + 1}</td>
                                <td>{consumer.TenTK}</td>
                                <td>{consumer.MatKhau}</td>
                                <td>{consumer.MaNV}</td>
                                <td>{consumer.Quyen}</td>
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
                                                        setselectedAccount(consumer);
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
                                                                    {consumer.TenTK}
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

export interface Account {
    TenTK: string;
    MatKhau: string;
    MaNV: string;
    Quyen: string;
}
const searchOptions = [
    { label: "Tên tài khoản", value: "TenTK" },
    { label: "Mã nhân viên", value: "MaNV" },
    { label: "Quyền", value: "Quyen" },
];

const mockData: Account[] = [
    {
        TenTK: "admin",
        MatKhau: "admin",
        MaNV: "NV001",
        Quyen: "Admin",
    },
    {
        TenTK: "nhanvien1",
        MatKhau: "nhanvien1",
        MaNV: "NV002",
        Quyen: "q1",
    },
    {
        TenTK: "nhanvien2",
        MatKhau: "nhanvien2",
        MaNV: "NV003",
        Quyen: "q2",
    },
    {
        TenTK: "nhanvien3",
        MatKhau: "nhanvien3",
        MaNV: "NV004",
        Quyen: "q3",
    },
];
