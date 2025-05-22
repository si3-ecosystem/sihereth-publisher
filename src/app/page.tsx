"use client";
import { useState, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Navbar from "@/components/main/Navbar";
import Domain from "@/components/main/Domain";
import DynamicComponent from "@/components/drawer";
import EditablePage from "@/components/sections";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editPage, setEditPage] = useState<string>("");
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
      {/* Navbar */}
      <Navbar />
      {/* Domain section */}
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
