import { useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import Link from "next/link";
import { RiLoaderFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { FaDesktop, FaTabletAlt, FaMobileAlt, FaPlay } from "react-icons/fa";
import { toast } from "react-hot-toast";

type ViewMode = "mobile" | "tablet" | "desktop";

interface NavbarProps {
  navigate: (path: string) => void;
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  setDrawerWidth: (drawerWidth: string) => void;
}

const Navbar = ({ navigate, viewMode, setViewMode, setDrawerWidth }: NavbarProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const updateViewMode = () => {
    const width = window.innerWidth;
    setIsSmallScreen(width <= 768);
    if (width <= 768) {
      setViewMode("mobile");
      setDrawerWidth("100%");
    } else if (width <= 1024) {
      setViewMode("tablet");
      setDrawerWidth("70%");
    } else {
      setViewMode("desktop");
      setDrawerWidth("25%");
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
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.status === 400 ? error.response.data : "Server error. Please try again!");
    }
  };

  return (
    <nav className="flex relative font-dm-sans justify-between items-center px-2 w-full p-1 lg:p-3 border-b border-gray-300 sm:px-6 lg:px-8 bg-gray-100">
      {/* Logo Section */}
      <div className="flex gap-2 sm:gap-4 items-center">
        <GrHomeRounded className="size-6" />
        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">Si Her Publisher</p>
      </div>
      {/* View Mode */}
      {!isSmallScreen && (
        <div className="hidden sm:flex flex-1 justify-center items-center gap-6">
          <FaDesktop
            onClick={() => {
              setViewMode("desktop");
            }}
            className={`size-7 cursor-pointer transition-colors ${viewMode === "desktop" ? "text-purple-600" : "text-gray-600 hover:text-black"}`}
          />
          <FaTabletAlt
            onClick={() => {
              setViewMode("tablet");
            }}
            className={`size-7 cursor-pointer transition-colors ${viewMode === "tablet" ? "text-purple-600" : "text-gray-600 hover:text-black"}`}
          />
          <FaMobileAlt
            onClick={() => {
              setViewMode("mobile");
            }}
            className={`size-7 cursor-pointer transition-colors ${viewMode === "mobile" ? "text-purple-600" : "text-gray-600 hover:text-black"}`}
          />
        </div>
      )}
      {/* Right Section */}
      <div className="flex gap-2 sm:gap-4 items-center">
        {/* Preview Button */}
        <Link
          href="/preview"
          className="flex gap-2 sm:gap-4 items-center px-2 md:px-3 lg:px-5 h-9 sm:h-11 sm:font-medium text-white bg-gray-900 rounded-lg hover:shadow-md text-xs sm:text-sm md:text-base lg:text-lg"
        >
          <FaPlay className="size-3" />
          Preview
        </Link>
        {/* Publish Button */}
        <button
          onClick={handlePublish}
          className="flex gap-2 sm:gap-4 items-center px-2 md:px-3 lg:px-5 h-9 sm:h-11 sm:font-medium text-white bg-gray-900 rounded-lg hover:shadow-md text-xs sm:text-sm md:text-base lg:text-lg"
        >
          <div className="bg-green-500 size-2 rounded-full"></div>Publish
          {loading && <RiLoaderFill className="animate-spin size-5" />}
        </button>
        {/* Logout Button */}
        <button
          onClick={() => {
            navigate("/auth/login");
          }}
          className="flex gap-2 sm:gap-4 items-center px-2 md:px-3 lg:px-5 h-9 sm:h-11 sm:font-medium text-white bg-gray-900 rounded-lg hover:shadow-md text-xs sm:text-sm md:text-base lg:text-lg"
        >
          <p>Logout</p>
          <IoIosLogOut className="size-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
