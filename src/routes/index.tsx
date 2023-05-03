import { MainLayout } from "@/components/layout/MainLayout";
import AccountManagePage from "@/pages/AccountManagaPage";
import ConsumerManagePage from "@/pages/ConsumerPage";
import EmployeeManagePage from "@/pages/EmployeeManagePage";
import { LoginPage } from "@/pages/LoginPage";
import SellerPage from "@/pages/SellerPage";
import StatisticsPage from "@/pages/StatisticsPage";
import { createBrowserRouter } from "react-router-dom";
import { Image } from "@mantine/core";
import ImportPage from "@/pages/ImportPage";
import ProductPage from "@/pages/ProductPage";
import CategoryPage from "@/pages/CategoryPage";
export const Routes = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <div className="text-2xl p-36 font-bold">Chào Ngô Hữu Hoàng</div>,
            },
            {
                path: "/banhang",
                element: <SellerPage />,
            },
            {
                path: "/nhanvien",
                element: <EmployeeManagePage />,
            },
            {
                path: "/khachhang",
                element: <ConsumerManagePage />,
            },
            {
                path: "/thongke",
                element: <StatisticsPage />,
            },
            {
                path: "/taikhoan",
                element: <AccountManagePage />,
            },
            {
                path: "/nhaphang",
                element: <ImportPage />,
            },
            {
                path: "/sanpham",
                element: <ProductPage />,
            },
            {
                path: "/loaisanpham",
                element: <CategoryPage />,
            },
            {
                path: "*",
                element: (
                    <div className="mx-auto mt-20">
                        <div className="text-2xl w-[400px] mx-auto font-bold">
                            Chức năng này đang được phát triển hehe:))
                        </div>
                        <Image
                            src="https://media.discordapp.net/attachments/745580405088059442/1102985622995611658/FB_IMG_1672934139402.jpg"
                            alt="404"
                            width={400}
                            height={400}
                            className="mx-auto"
                        />
                    </div>
                ),
            },
        ],
    },
]);

export default Routes;
