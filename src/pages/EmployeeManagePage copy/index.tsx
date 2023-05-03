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
import CreateEmployeeModal from "./CreateEmployeeModal";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
export default function EmployeeManagePage() {
    const [selectedEmployee, setselectedEmployee] = React.useState<Employee | undefined>();
    const [opened, { open, close }] = useDisclosure(false);
    const [mode, setMode] = React.useState<"create" | "edit">("create");

    return (
        <div className="px-4 w-full h-full pt-0">
            <CreateEmployeeModal opened={opened} mode={mode} close={close} employee={selectedEmployee} />
            <Flex className="justify-center">
                <Title>Quản lý nhân viên</Title>
            </Flex>
            <Divider
                my="xs"
                variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <IconSearch size={12} />
                        <Box fz={"md"} ml={5}>
                            Tìm kiếm nhân viên
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
                <Divider orientation="vertical" />
                <Flex className="border">
                    <DateInput
                        label="Ngày sinh từ:"
                        placeholder="Ngày sinh từ"
                        size="md"
                        className="grow-0 max-w-[180px]"
                    />
                    <DateInput label="Đến:" placeholder="Đến" size="md" className="ml-4 grow-0 max-w-[180px]" />
                </Flex>
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
                <Title order={2}>Danh sách nhân viên</Title>
                <Flex gap={"md"}>
                    <Button
                        size="md"
                        leftIcon={<IconUserPlus />}
                        onClick={() => {
                            setMode("create");
                            setselectedEmployee(undefined);
                            open();
                        }}
                    >
                        Thêm nhân viên{" "}
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
                            <th>Ngày sinh</th>
                            <th>Địa chỉ</th>
                            <th>SĐT</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((employee, index) => (
                            <tr key={employee.MaNV} onClick={() => setselectedEmployee(employee)}>
                                <td>{index + 1}</td>
                                <td>{employee.MaNV}</td>
                                <td>{employee.TenNV}</td>
                                <td>{employee.NgaySinh}</td>
                                <td>{employee.DiaChi}</td>
                                <td>{employee.SDT}</td>
                                <td>{employee.TrangThai === 0 ? "Đang làm việc" : "Đã nghỉ việc"}</td>
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
                                                        setselectedEmployee(employee);
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
                                                            title: "Bạn có chắc chắn muốn xóa nhân viên này?",
                                                            children: (
                                                                <Text size="sm">
                                                                    Bạn có chắc chắn muốn xóa nhân viên {employee.TenNV}
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
                                                                    message: "Đã huỷ xoá nhân viên",
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

export interface Employee {
    MaNV: string;
    TenNV: string;
    NgaySinh: string;
    DiaChi: string;
    SDT: string;
    TrangThai: number;
}

const searchOptions = [
    { label: "Mã nhân viên", value: "MaNV" },
    { label: "Tên nhân viên", value: "TenNV" },
    { label: "Ngày sinh", value: "NgaySinh" },
    { label: "Địa chỉ", value: "DiaChi" },
    { label: "Số điện thoại", value: "SDT" },
    { label: "Trạng thái", value: "TrangThai" },
];

const mockData: Employee[] = [
    {
        MaNV: "NV1",
        TenNV: "Phan Văn A",
        NgaySinh: "1978-04-05",
        DiaChi: "Đà Nẵng",
        SDT: "0145647854",
        TrangThai: 0,
    },
    {
        MaNV: "NV10",
        TenNV: "Nguyễn Thị B",
        NgaySinh: "1993-11-29",
        DiaChi: "Bến Tre",
        SDT: "01262368193",
        TrangThai: 0,
    },
    {
        MaNV: "NV11",
        TenNV: "Cao Văn C",
        NgaySinh: "1993-12-11",
        DiaChi: "Nghệ An",
        SDT: "0366227168",
        TrangThai: 0,
    },
    {
        MaNV: "NV12",
        TenNV: "Ngô Hữu E",
        NgaySinh: "2003-09-13",
        DiaChi: "Trần Bình Trọng, P4, Q5, TP HCM",
        SDT: "0981578293",
        TrangThai: 0,
    },
    {
        MaNV: "NV13",
        TenNV: "Lê văn C",
        NgaySinh: "1991-09-12",
        DiaChi: "Sóc Trăng",
        SDT: "0977232173",
        TrangThai: 0,
    },
    {
        MaNV: "NV14",
        TenNV: "Nguyễn Z",
        NgaySinh: "1992-08-13",
        DiaChi: "TP HCM",
        SDT: "0805126735",
        TrangThai: 0,
    },
    {
        MaNV: "NV15",
        TenNV: "Nhân Viên L",
        NgaySinh: "1992-12-30",
        DiaChi: "Hà Nội",
        SDT: "0703689147",
        TrangThai: 0,
    },
    {
        MaNV: "NV16",
        TenNV: "Trương K",
        NgaySinh: "1992-11-28",
        DiaChi: "TP HCM",
        SDT: "0825719263",
        TrangThai: 0,
    },
];
