import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button, Stack, TextInput, Textarea, Title, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { Account } from ".";

interface Props {
    opened: boolean;
    close: () => void;
    mode?: "create" | "edit";
    account?: Account;
}
const defaultEm = {
    TenTK: "",
    MatKhau: "",
    MaNV: "",
    Quyen: "",
};
export default function CreateAccountModal({ opened, close, mode = "create", account = defaultEm }: Props) {
    const [accountData, setAccountData] = React.useState<Account>(account);
    const onSubmit = () => {
        notifications.show({
            message: "Tạo tài khoản thành công",
            color: "green",
            title: "Thành công",
        });
        close();
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountData({ ...accountData, [e.target.name]: e.target.value });
    };
    React.useEffect(() => {
        setAccountData(account || defaultEm);
    }, [JSON.stringify(account)]);
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
                    <Title order={3}>{mode === "create" ? "Thêm " : "Sửa thông tin "} tài khoản</Title>
                </Modal.Title>
                <Stack>
                    <TextInput
                        placeholder="Tên tài khoản"
                        label="Tên tài khoản"
                        required
                        name="TenTK"
                        onChange={onChange}
                        value={accountData.TenTK}
                    />

                    <TextInput
                        placeholder="Mật khẩu"
                        label="Mật khẩu"
                        required
                        name="MatKhau"
                        onChange={onChange}
                        value={accountData.MatKhau}
                    />
                    <TextInput
                        placeholder="Mã nhân viên"
                        label="Mã nhân viên"
                        required
                        name="MaNV"
                        value={accountData.MaNV}
                        onChange={onChange as any}
                    />
                    <Select
                        placeholder="Quyền"
                        data={[
                            { label: "Admin", value: "1" },
                            { label: "Quản lý", value: "2" },
                            { label: "Nhân viên", value: "3" },
                        ]}
                        label="Trạng thái"
                        size="md"
                        required
                        defaultValue={"1"}
                        value={accountData.Quyen}
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
