"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Header from "@/components/main/Header";
import Navbar from "@/components/main/Navbar";
import Domain from "@/components/main/Domain";
import { useRouter } from "next/navigation";
import apiClient from "@/utils/interceptor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
// import { handleNewWebpage, handleWebsiteData } from "../redux/contentSlice";
import DynamicComponent from "@/components/drawer";
import { RiLoaderFill } from "react-icons/ri";
import EditablePage from "@/components/pages/index";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isNewWebpage } = useSelector((state: RootState) => state.content);
  const [getLoading, setGetLoading] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<string>("100%");
  const [isSubDomain, setIsSubDomain] = useState<string>("");
  const [isPublishWebpage, setIsPublishWebpage] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editPage, setEditPage] = useState<string>("");
  const [mode, setMode] = useState<string>("Publish");
  const [viewMode, setViewMode] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const openDrawer = () => setIsOpen(true);
  const handleToggleView = useCallback((viewSize: string) => setScreenWidth(viewSize), []);

  const getWebsiteContent = useCallback(async () => {
    try {
      setGetLoading(true);
      const { data } = await apiClient.get(`/api/webpage`);
      if (data?.subDomain) {
        setIsSubDomain(data?.subDomain);
      }
      if (!data?.data) {
        setIsPublishWebpage(false);
        // dispatch(handleWebsiteData(websiteContent));
        setGetLoading(false);
        return;
      }
      setIsPublishWebpage(true);
      setMode("Update");
      setGetLoading(false);
      // dispatch(handleNewWebpage(false));
      // dispatch(handleWebsiteData(data?.data));
    } catch (error: any) {
      setGetLoading(false);
      console.log(error);
      if (error.response?.status === 404) {
        // dispatch(handleWebsiteData(websiteContent));
        return;
      }
      toast.error("Server error. Please refresh the page");
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (!websiteData && userData) {
  //     getWebsiteContent();
  //   }
  // }, [websiteData, userData, getWebsiteContent]);

  return (
    <div className="h-screen">
      {/* Header */}
      <Header />
      {/* Navbar */}
      <Navbar
        handleToggleView={handleToggleView}
        mode={mode}
        navigate={router.push}
        viewMode={viewMode}
        setViewMode={setViewMode}
        getWebsiteContent={getWebsiteContent}
        isNewWebpage={isNewWebpage}
      />
      {/* Domain section */}
      <Domain isSubDomain={isSubDomain} setIsSubDomain={setIsSubDomain} isPublishWebpage={isPublishWebpage} />
      {/* Page View */}
      {getLoading ? (
        <div className="flex justify-center items-center w-full h-96">
          <RiLoaderFill className="text-gray-900 animate-spin size-12" />
        </div>
      ) : (
        <div className={`transition-width flex justify-center duration-500 ${isOpen ? "w-[75%]" : "w-[100%]"}`}>
          <div style={{ width: `${screenWidth}` }}>
            <EditablePage setEditPage={setEditPage} openDrawer={openDrawer} />
          </div>
          <Drawer open={isOpen} onClose={() => setIsOpen(false)} direction="right" size="25%" enableOverlay={false}>
            <DynamicComponent toggleDrawer={() => setIsOpen(false)} editPage={editPage} />
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default Home;
