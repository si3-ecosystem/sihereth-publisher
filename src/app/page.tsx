"use client";
import { useState, useCallback, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Header from "@/components/main/Header";
import Navbar from "@/components/main/Navbar";
import Domain from "@/components/main/Domain";
import { useRouter } from "next/navigation";
import DynamicComponent from "@/components/drawer";
import EditablePage from "@/components/sections/index";

function Home() {
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState<string>("100%");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editPage, setEditPage] = useState<string>("");
  const [viewMode, setViewMode] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const openDrawer = () => setIsOpen(true);
  const handleToggleView = useCallback((viewSize: string) => setScreenWidth(viewSize), []);

  useEffect(() => {
    console.log(editPage);
  }, [editPage]);
  return (
    <div className="h-screen text-gray-800">
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
      <div
        className={`transition-width flex justify-center duration-500 h-[calc(100vh-13.7rem)] overflow-auto ${isOpen ? "w-[75%]" : "w-[100%]"}`}
      >
        <div style={{ width: `${screenWidth}` }}>
          <EditablePage setEditPage={setEditPage} openDrawer={openDrawer} />
        </div>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)} direction="right" size="25%" enableOverlay={false}>
          <DynamicComponent toggleDrawer={() => setIsOpen(false)} editPage={editPage} />
        </Drawer>
      </div>
    </div>
  );
}

export default Home;
