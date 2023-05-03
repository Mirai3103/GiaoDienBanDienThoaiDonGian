import { useState } from "react";
import { createStyles, Navbar, Group, Code, getStylesRef, rem, UnstyledButton, ScrollArea, Flex } from "@mantine/core";
import {
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout,
    IconHome,
    IconBuildingStore,
    IconShoppingCartPlus,
    IconBrandProducthunt,
    IconBookmarks,
    IconReceiptRefund,
    IconDiscount,
    IconDiscount2,
    IconUsers,
    IconUserCheck,
    IconBuildingFactory,
    IconShield,
    IconGraph,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import { ipcRenderer } from "electron";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
            0.1
        ),
        flexGrow: 0,
        flexShrink: 0,
    },

    version: {
        backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
            0.2
        ),
        color: theme.white,
        fontWeight: 700,
    },

    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
            0.1
        )}`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
            0.3
        )}`,
    },
    navSection: {
        borderTop: `${rem(1)} solid ${theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
            0.3
        )}`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.lg,
        color: theme.white,
        padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 600,

        "&:hover": {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
                0.2
            ),
        },
    },

    linkIcon: {
        ref: getStylesRef("icon"),
        color: theme.white,
        opacity: 0.9,
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background!,
                0.15
            ),
            [`& .${getStylesRef("icon")}`]: {
                opacity: 0.9,
            },
            fontWeight: 700,
        },
    },
}));

const navData = [
    [{ link: "/", label: "Trang chủ", icon: IconHome }],
    [
        { link: "/banhang", label: "Bán hàng", icon: IconBuildingStore },
        { link: "/nhaphang", label: "Nhập hàng", icon: IconShoppingCartPlus },
    ],
    [
        { link: "/sanpham", label: "Sản phẩm", icon: IconBrandProducthunt },
        { link: "/loaisanpham", label: "Loại sản phẩm", icon: IconBookmarks },
        { link: "/hoadon", label: "Hóa đơn", icon: IconReceipt2 },
        { link: "/phieunhap", label: "Phiếu nhập", icon: IconReceiptRefund },
        { link: "/khuyenmai", label: "Khuyến mãi", icon: IconDiscount2 },
    ],
    [
        { link: "/nhanvien", label: "Nhân viên", icon: IconUserCheck },
        { link: "/khachhang", label: "Khách hàng", icon: IconUsers },
        { link: "/nhacungcap", label: "Nhà cung cấp", icon: IconBuildingFactory },
    ],
    [
        { link: "/taikhoan", label: "Tài khoản", icon: Icon2fa },
        { link: "/quyen", label: "Quyền", icon: IconShield },
    ],
    [{ link: "/thongke", label: "Thống kê", icon: IconGraph }],
];
export function MainLayout() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState("Billing");
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Flex>
            <Navbar height={"100vh"} width={{ sm: 300 }} p="md" className={classes.navbar}>
                <ScrollArea h={"80vh"}>
                    {navData.map((item, index) => {
                        return (
                            <Navbar.Section key={index} className={classes.navSection}>
                                {item.map((item, index) => {
                                    return (
                                        <a
                                            className={cx(classes.link, {
                                                [classes.linkActive]: item.link === location.pathname,
                                            })}
                                            href={item.link}
                                            key={item.label}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                navigate(item.link);
                                            }}
                                        >
                                            <item.icon className={classes.linkIcon} stroke={1.5} />
                                            <span>{item.label}</span>
                                        </a>
                                    );
                                })}
                            </Navbar.Section>
                        );
                    })}
                </ScrollArea>

                <Navbar.Section className={classes.footer}>
                    <Group className={classes.link}>Ngô Hữu Hoàng</Group>

                    <UnstyledButton
                        className={classes.link}
                        onClick={() => {
                            ipcRenderer.send("logout");
                        }}
                    >
                        <IconLogout className={classes.linkIcon} stroke={1.5} />
                        <span>Logout</span>
                    </UnstyledButton>
                </Navbar.Section>
            </Navbar>
            <ScrollArea className="grow shrink max-h-screen">
                <Outlet />
            </ScrollArea>
        </Flex>
    );
}
