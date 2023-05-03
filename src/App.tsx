import { useState } from "react";
import Routes from "./routes";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
function App() {
    const [count, setCount] = useState(0);
    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                fontFamily: "nunito",
                primaryColor: "indigo",
            }}
        >
            {" "}
            <ModalsProvider>
                <Notifications />
            </ModalsProvider>
            <RouterProvider router={Routes} />
        </MantineProvider>
    );
}

export default App;
