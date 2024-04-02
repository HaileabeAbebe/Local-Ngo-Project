import { FC, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen  text-gray-800">
      <Header />
      <main className={`flex-1 ${isHomePage ? "" : "container mx-auto pt-20"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
