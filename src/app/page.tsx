"use client";
import { useState, useCallback } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Header from "@/components/main/Header";
import Navbar from "@/components/main/Navbar";
import Domain from "@/components/main/Domain";
import { useRouter } from "next/navigation";
import DynamicComponent from "@/components/drawer";
import EditablePage from "@/components/pages/index";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function Home() {
  const router = useRouter();
  const data = useSelector((state: RootState) => state.content);
  const [screenWidth, setScreenWidth] = useState<string>("100%");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editPage, setEditPage] = useState<string>("");
  const [viewMode, setViewMode] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const openDrawer = () => setIsOpen(true);
  const handleToggleView = useCallback((viewSize: string) => setScreenWidth(viewSize), []);

  return (
    <div className="h-screen">
      {/* Header */}
      <Header />
      {/* Navbar */}
      <Navbar
        handleToggleView={handleToggleView}
        navigate={router.push}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {/* Domain section */}
      <Domain />
      {/* Page View */}
      <div className={`transition-width flex justify-center duration-500 ${isOpen ? "w-[75%]" : "w-[100%]"}`}>
        <div style={{ width: `${screenWidth}` }}>
          <EditablePage setEditPage={setEditPage} openDrawer={openDrawer} content={data} />
        </div>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)} direction="right" size="25%" enableOverlay={false}>
          <DynamicComponent toggleDrawer={() => setIsOpen(false)} editPage={editPage} content={data} />
        </Drawer>
      </div>
    </div>
  );
}

export default Home;
