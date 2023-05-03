import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button, Stack, TextInput, Textarea, Title, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { Employee } from ".";

interface Props {
    opened: boolean;
    close: () => void;
    mode?: "create" | "edit";
    employee?: Employee;
}
const defaultEm = {
    DiaChi: "",
    MaNV: "",
    NgaySinh: "2003-09-13",
    SDT: "",
    TenNV: "",
    TrangThai: 0,
};
export default function CreateEmployeeModal({ opened, close, mode = "create", employee = defaultEm }: Props) {
    const [employeeData, setEmployeeData] = React.useState<Employee>(employee);
    const onSubmit = () => {
        notifications.show({
            message: "Thêm nhân viên thành công",
            color: "green",
            title: "Thành công",
        });
        close();
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    };
    React.useEffect(() => {
        setEmployeeData(employee || defaultEm);
    }, [JSON.stringify(employee)]);
    return (
        <>
            <Modal
                opened={opened}
                overlayProps={{
                    opacity: 0.8,
                }}
                onClose={close}
                centered
            >
                <Modal.Title mb={"lg"}>
                    <Title order={3}>{mode === "create" ? "Thêm " : "Sửa thông tin "} nhân viên</Title>
                </Modal.Title>
                <Stack>
                    <TextInput
                        placeholder="Mã nhân viên"
                        label="Mã nhân viên"
                        required
                        disabled
                        value={mode === "create" ? "NV001" : employeeData.MaNV}
                        name="MaNV"
                        onChange={onChange}
                    />
                    <TextInput
                        placeholder="Tên nhân viên"
                        label="Tên nhân viên"
                        required
                        name="TenNV"
                        onChange={onChange}
                        value={employeeData.TenNV}
                    />
                    <DateInput
                        label="Ngày sinh:"
                        placeholder="Ngày sinh"
                        size="md"
                        required
                        value={new Date(employeeData.NgaySinh)}
                        onChange={(v) => {
                            const format = `${v?.getFullYear()}-${v?.getMonth() || 0 + 1}-${v?.getDate()}`;
                            setEmployeeData({ ...employeeData, NgaySinh: format });
                        }}
                    />
                    <TextInput
                        placeholder="Số điện thoại"
                        label="Số điện thoại"
                        required
                        name="SDT"
                        onChange={onChange}
                        value={employeeData.SDT}
                    />
                    <Textarea
                        placeholder="Địa chỉ"
                        label="Địa chỉ"
                        required
                        name="DiaChi"
                        value={employeeData.DiaChi}
                        onChange={onChange as any}
                    />
                    <Select
                        placeholder="Trạng thái làm việc"
                        data={[
                            { label: "Đang làm việc", value: "0" },
                            { label: "Đã nghỉ việc", value: "1" },
                        ]}
                        label="Trạng thái làm việc"
                        size="md"
                        required
                        defaultValue={"Đang làm việc"}
                        value={employeeData.TrangThai + ""}
                    />
                    <Group position="right">
                        <Button size="md" onClick={close} variant="outline" color="red">
                            Hủy
                        </Button>
                        <Button size="md" type="submit" onClick={onSubmit}>
                            {mode === "create" ? "Thêm" : "Lưu thông tin"}
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
}
