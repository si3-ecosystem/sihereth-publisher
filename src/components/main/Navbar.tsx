import { useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { IoPlayOutline } from "react-icons/io5";
import Link from "next/link";
import { RiLoaderFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { FaDesktop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

type ViewMode = "mobile" | "tablet" | "desktop";

interface NavbarProps {
  handleToggleView: (viewSize: string) => void;
  mode: string;
  navigate: (path: string) => void;
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  getWebsiteContent: () => void;
  isNewWebpage: boolean;
}

const Navbar = ({
  handleToggleView,
  mode,
  navigate,
  viewMode,
  setViewMode,
  getWebsiteContent,
  isNewWebpage
}: NavbarProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const updateViewMode = () => {
    const width = window.innerWidth;
    setIsSmallScreen(width <= 768);
    if (width <= 768) {
      setViewMode("mobile");
      handleToggleView("40%");
    } else if (width <= 1024) {
      setViewMode("tablet");
      handleToggleView("70%");
    } else {
      setViewMode("desktop");
      handleToggleView("100%");
    }
  };

  const debounce = (fn: () => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  };

  useEffect(() => {
    const handleResize = debounce(updateViewMode, 200);
    updateViewMode();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePublish = async () => {
    try {
      setLoading(true);
      // const response = isNewWebpage
      //   ? await apiClient.post(`/api/webpage`, websiteData)
      //   : await apiClient.put(`/api/webpage`, websiteData);
      setLoading(false);
      toast.success(`Webpage ${isNewWebpage ? "created" : "updated"} successfully`);
      getWebsiteContent();
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.status === 400 ? error.response.data : "Server error. Please try again!");
    }
  };

  return (
    <nav className="flex relative justify-between items-center px-2 w-full h-16 border-b border-gray-300 sm:px-6 lg:px-8">
      {/* Logo Section */}
      <div className="flex gap-4 items-center">
        <GrHomeRounded className="text-2xl" />
        <div>
          <p className="text-lg font-semibold">Si Her Brand</p>
          <p className="text-sm text-gray-600">Home</p>
        </div>
      </div>
      {/* View Mode */}
      {!isSmallScreen && (
        <div className="flex flex-1 justify-center items-center gap-6">
          <FaDesktop
            onClick={() => {
              setViewMode("desktop");
              handleToggleView("100%");
            }}
            className={`size-7 cursor-pointer transition-colors ${viewMode === "desktop" ? "text-purple-600" : "text-gray-600 hover:text-black"}`}
          />
          <FaTabletAlt
            onClick={() => {
              setViewMode("tablet");
              handleToggleView("70%");
            }}
            className={`size-7 cursor-pointer transition-colors ${viewMode === "tablet" ? "text-purple-600" : "text-gray-600 hover:text-black"}`}
          />
          <FaMobileAlt
            onClick={() => {
              setViewMode("mobile");
              handleToggleView("40%");
            }}
            className={`size-7 cursor-pointer transition-colors ${viewMode === "mobile" ? "text-purple-600" : "text-gray-600 hover:text-black"}`}
          />
        </div>
      )}
      {/* Right Section */}
      <div className="flex gap-4 items-center">
        {/* Preview Button */}
        <Link
          href="/preview"
          className="flex gap-2 items-center px-5 py-2 font-medium bg-transparent rounded-lg hover:bg-gray-200 hover:shadow-md transition"
        >
          <IoPlayOutline className="text-black" />
          Preview
        </Link>
        {/* Publish Button */}
        <button
          onClick={handlePublish}
          className="flex gap-2 items-center px-5 py-2 font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 hover:shadow-md border transition"
        >
          {loading && <RiLoaderFill className="animate-spin size-5" />}
          {loading ? "Loading..." : mode}
        </button>
        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("SI_HER");
            navigate("/auth/login");
          }}
          className="flex gap-2 items-center px-5 py-2 font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 hover:shadow-md border transition"
        >
          <p>Logout</p>
          <IoIosLogOut />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
