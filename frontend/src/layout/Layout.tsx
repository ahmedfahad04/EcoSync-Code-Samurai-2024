import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
    <div className={`flex flex-col min-h-screen ${customStyle}`}>
      <Navbar />
      <main className="flex-1 bg-[#1D2225] ">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
