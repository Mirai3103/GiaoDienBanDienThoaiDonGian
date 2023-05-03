import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ipcRenderer } from "electron";
import { useRef } from "react";

export function LoginPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const onLogin = () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        ipcRenderer.send("login", {
            username,
            password,
        });
    };
    return (
        <div className="grid w-screen h-screen place-content-center place-items-center">
            <div className="w-[350px]">
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `nunito, ${theme.fontFamily}`, fontWeight: 600 })}
                    order={2}
                >
                    Chào trở lại!
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Đăng nhập để sử dụng phần mềm
                </Text>

                <Paper withBorder shadow="md" p={30} mt={10} radius="md">
                    <TextInput
                        size="md"
                        label="Tên đăng nhập"
                        placeholder="Tên đăng nhập của bạn"
                        required
                        ref={usernameRef}
                    />
                    <PasswordInput
                        size="md"
                        label="Mật khẩu"
                        placeholder="Mật khẩu của bạn"
                        required
                        mt="md"
                        ref={passwordRef}
                    />

                    <Button fullWidth size="md" mt="xl" onClick={onLogin}>
                        Đăng nhập
                    </Button>
                </Paper>
            </div>
        </div>
    );
}
