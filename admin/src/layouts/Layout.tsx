// src/components/Layout.tsx
import { FC, ReactNode } from "react";
import Navigation from "../components/Navigation";
import Sidebar from "../components/SideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navigation />
        <main className="flex-grow p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
