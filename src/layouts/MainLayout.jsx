import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet, ScrollRestoration } from "react-router";
import NavigationProgressBar from "../components/layout/NavigationProgressBar";

export default function MainLayout() {
    return (
        <>
            <NavigationProgressBar />
            <Header />
            <ScrollRestoration />
            <Outlet />
            <Footer />
        </>
    );
}
