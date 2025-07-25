"use client";
import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Navbar from "@/components/main/Navbar";
import Domain from "@/components/main/Domain";
import DynamicComponent from "@/components/drawer";
import EditablePage from "@/components/sections";
import apiClient from "@/utils/interceptor";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editPage, setEditPage] = useState<string>("");
  const openDrawer = () => setIsOpen(true);

  useEffect(() => {
    try {
      const res = apiClient.get("/auth/validate-token");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className="h-screen text-gray-800">
      <Navbar />
      <Domain />
      {/* Page View */}
      <div className="flex justify-center">
        <section className="w-full">
          <EditablePage setEditPage={setEditPage} openDrawer={openDrawer} />
        </section>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)} direction="right" size="25%" enableOverlay={false}>
          <DynamicComponent toggleDrawer={() => setIsOpen(false)} editPage={editPage} />
        </Drawer>
      </div>
    </div>
  );
};

export default Home;
