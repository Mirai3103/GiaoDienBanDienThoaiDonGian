import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button, Stack, TextInput, Textarea, Title, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { Consumer } from ".";

interface Props {
    opened: boolean;
    close: () => void;
    mode?: "create" | "edit";
    consumer?: Consumer;
}
const defaultEm = {
    DiaChi: "",
    MaKH: "",
    TenKH: "",
    SDT: "",
    TrangThai: 0,
};
export default function CreateConsumerModal({ opened, close, mode = "create", consumer = defaultEm }: Props) {
    const [consumerData, setConsumerData] = React.useState<Consumer>(consumer);
    const onSubmit = () => {
        notifications.show({
            message: "Thêm khách hàng thành công",
            color: "green",
            title: "Thành công",
        });
        close();
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConsumerData({ ...consumerData, [e.target.name]: e.target.value });
    };
    React.useEffect(() => {
        setConsumerData(consumer || defaultEm);
    }, [JSON.stringify(consumer)]);
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
                    <Title order={3}>{mode === "create" ? "Thêm " : "Sửa thông tin "} khách hàng</Title>
                </Modal.Title>
                <Stack>
                    <TextInput
                        placeholder="Mã khách hàng"
                        label="Mã khách hàng"
                        required
                        disabled
                        value={mode === "create" ? "NV001" : consumerData.MaKH}
                        name="MaKH"
                        onChange={onChange}
                    />
                    <TextInput
                        placeholder="Tên khách hàng"
                        label="Tên khách hàng"
                        required
                        name="TenKH"
                        onChange={onChange}
                        value={consumerData.TenKH}
                    />

                    <TextInput
                        placeholder="Số điện thoại"
                        label="Số điện thoại"
                        required
                        name="SDT"
                        onChange={onChange}
                        value={consumerData.SDT}
                    />
                    <Textarea
                        placeholder="Địa chỉ"
                        label="Địa chỉ"
                        required
                        name="DiaChi"
                        value={consumerData.DiaChi}
                        onChange={onChange as any}
                    />
                    <Select
                        placeholder="Trạng thái "
                        data={[
                            { label: "Ẩn", value: "0" },
                            { label: "Hiện", value: "1" },
                        ]}
                        label="Trạng thái"
                        size="md"
                        required
                        defaultValue={"1"}
                        value={consumerData.TrangThai + ""}
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
