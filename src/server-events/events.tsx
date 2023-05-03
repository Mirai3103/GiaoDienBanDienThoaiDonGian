import { notifications } from "@mantine/notifications";
import { ipcRenderer } from "electron";
import { IconInfoCircle, IconAlertCircle, IconAlertTriangle } from "@tabler/icons-react";
ipcRenderer.on("message", (_event, ...args) => {
    notifications.show({
        title: "Thông báo",
        message: args[0],
        color: "teal",
        icon: <IconInfoCircle />,
    });
});

ipcRenderer.on("error", (_event, ...args) => {
    notifications.show({
        title: "Lỗi",
        message: args[0],
        color: "red",
        icon: <IconAlertCircle />,
    });
});
