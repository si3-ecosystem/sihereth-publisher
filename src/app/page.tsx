"use client";
import { useState, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Header from "@/components/main/Header";
import Navbar from "@/components/main/Navbar";
import Domain from "@/components/main/Domain";
import DynamicComponent from "@/components/drawer";
import EditablePage from "@/components/sections";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const Home = () => {
  const [drawerWidth, setDrawerWidth] = useState<string>("25%");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editPage, setEditPage] = useState<string>("");
  const [viewMode, setViewMode] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const openDrawer = () => setIsOpen(true);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user?.id && !user?.token) {
      router.replace("/login");
    }
  }, [user?.id, user?.token, router]);

  return (
    <div className="h-screen text-gray-800">
      {/* Header */}
      <Header />
      {/* Navbar */}
      <Navbar viewMode={viewMode} setViewMode={setViewMode} setDrawerWidth={setDrawerWidth} />
      {/* Domain section */}
      <Domain />
      {/* Page View */}
      <div className={`flex justify-center h-[calc(100vh-9.4rem)] overflow-auto`}>
        <section className="w-full">
          <EditablePage setEditPage={setEditPage} openDrawer={openDrawer} />
        </section>
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          direction="right"
          size={drawerWidth}
          enableOverlay={false}
        >
          <DynamicComponent toggleDrawer={() => setIsOpen(false)} editPage={editPage} />
        </Drawer>
      </div>
    </div>
  );
};

export default Home;
