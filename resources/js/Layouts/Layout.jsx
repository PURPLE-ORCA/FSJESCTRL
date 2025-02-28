import Navbar from "./Navbar";

const Layout = ({ header, children }) => {
    return (
        <div className="bg-black">
            <div>
                <p className="text-center text-white bg-slate-700">
                    App currently in first beta
                </p>
                <Navbar />
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
