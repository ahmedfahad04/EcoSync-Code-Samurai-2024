import Sidebar from "@/components/Sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  customStyle?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  customStyle,
}: LayoutProps) => {
  return (
    <div className={`flex ${customStyle}`}>
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
