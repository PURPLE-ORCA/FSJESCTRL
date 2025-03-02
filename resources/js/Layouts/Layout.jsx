import SonnerToastProvider from "@/Components/SonnerToastProvider";
import Navbar from "./Navbar";

const Layout = ({ header, children }) => {
    return (
        <SonnerToastProvider>
            <div className="bg-white dark:bg-black text-black dark:text-white">
                <div>
                    {/* <p className="text-center text-white bg-slate-700">
                        App currently in first beta
                    </p> */}
                    <Navbar />
                </div>
                <main>{children}</main>
            </div>
        </SonnerToastProvider>
    );
};

export default Layout;
