import { Box, Flex, Image, Table, Tabs, TabsProps, Title, rem } from "@mantine/core";
import { IconChartLine, IconCoin, IconDevices, IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";
import React from "react";
import ConsumerImg from "../../assets/icons8-consumer-66.png";
import EmployeeImg from "../../assets/icons8-employee-64.png";
import ProductImg from "../../assets/icons8-phone-64.png";
import ProviderImg from "../../assets/icons8-factory-50.png";
import GeneralTab from "./GeneralTab";
import ProductTab from "./ProductTab";
import EmployeeTab from "./EmployeeTab";
function StyledTabs(props: TabsProps) {
    return (
        <Tabs
            unstyled
            styles={(theme) => ({
                tab: {
                    ...theme.fn.focusStyles(),
                    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
                    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[9],
                    border: `${rem(1)} solid ${
                        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
                    }`,
                    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                    cursor: "pointer",
                    fontSize: theme.fontSizes.lg,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",

                    "&:disabled": {
                        opacity: 0.5,
                        cursor: "not-allowed",
                    },

                    "&:not(:first-of-type)": {
                        borderLeft: 0,
                    },

                    "&:first-of-type": {
                        borderTopLeftRadius: theme.radius.md,
                        borderBottomLeftRadius: theme.radius.md,
                    },

                    "&:last-of-type": {
                        borderTopRightRadius: theme.radius.md,
                        borderBottomRightRadius: theme.radius.md,
                    },

                    "&[data-active]": {
                        backgroundColor: theme.colors.blue[7],
                        borderColor: theme.colors.blue[7],
                        color: theme.white,
                    },
                },

                tabIcon: {
                    marginRight: theme.spacing.xs,
                    fontSize: theme.fontSizes.lg,
                    display: "flex",
                    alignItems: "center",
                },

                tabsList: {
                    display: "flex",
                },
            })}
            {...props}
        />
    );
}

export default function StatisticsPage() {
    return (
        <StyledTabs m={"md"} defaultValue={"general"}>
            <Tabs.List>
                <Tabs.Tab value="general" icon={<IconChartLine size="1.5rem" />}>
                    Thống kê chung
                </Tabs.Tab>
                <Tabs.Tab value="product" icon={<IconMessageCircle size="1.5rem" />}>
                    Sản phẩm
                </Tabs.Tab>
                <Tabs.Tab value="employee" icon={<IconPhoto size="1.5rem" />}>
                    Nhân viên
                </Tabs.Tab>
            </Tabs.List>
            <GeneralTab />
            <ProductTab />
            <EmployeeTab />
        </StyledTabs>
    );
}
