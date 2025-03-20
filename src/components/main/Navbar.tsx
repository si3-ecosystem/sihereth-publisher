import { useEffect, useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import Link from "next/link";
import { RiLoaderFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { FaDesktop, FaTabletAlt, FaMobileAlt, FaPlay } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";

type ViewMode = "mobile" | "tablet" | "desktop";

interface NavbarProps {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  setDrawerWidth: (drawerWidth: string) => void;
}

const Navbar = ({ viewMode, setViewMode, setDrawerWidth }: NavbarProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

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
    <nav className="font-dm-sans border-b border-gray-300 sm:px-6 lg:px-8 bg-gray-100">
      <div className="flex relative justify-between items-center px-2 w-full p-1 lg:p-2 max-w-[90rem] mx-auto text-xs">
        {/* Logo Section */}
        <div className="flex gap-2 sm:gap-4 items-center">
          <GrHomeRounded className="size-5" />
          <p className="font-semibold mt-1">Si Her Publisher</p>
        </div>
        {/* View Mode */}
        {!isSmallScreen && (
          <div className="hidden sm:flex flex-1 justify-center items-center gap-2">
            <FaDesktop
              onClick={() => {
                setViewMode("desktop");
              }}
              className={`size-5 cursor-pointer transition-colors ${viewMode === "desktop" ? "text-purple-600" : "text-gray-600 hover:text-black"}`}
            />
            <FaTabletAlt
              onClick={() => {
                setViewMode("tablet");
              }}
              className={`size-5 cursor-pointer transition-colors ${viewMode === "tablet" ? "text-purple-600" : "text-gray-600 hover:text-black"}`}
            />
            <FaMobileAlt
              onClick={() => {
                setViewMode("mobile");
              }}
              className={`size-5 cursor-pointer transition-colors ${viewMode === "mobile" ? "text-purple-600" : "text-gray-600 hover:text-black"}`}
            />
          </div>
        )}
        {/* Right Section */}
        <div className="flex gap-2 sm:gap-4 items-center">
          {/* Preview Button */}
          <Link
            href="/preview"
            className="flex gap-2 items-center px-4 h-8 text-white bg-gray-900 rounded-lg hover:shadow-md"
          >
            <FaPlay className="size-3" />
            Preview
          </Link>
          {/* Publish Button */}
          <button
            onClick={handlePublish}
            className="flex gap-2 items-center px-4 h-8 sm:font-medium text-white bg-gray-900 rounded-lg hover:shadow-md"
          >
            <div className="bg-emerald-400 size-2 rounded-full"></div>Publish
            {loading && <RiLoaderFill className="animate-spin size-5" />}
          </button>
          {/* Logout Button */}
          <button
            onClick={() => {
              dispatch(logout());
              router.replace("/login");
            }}
            className="flex gap-2 items-center px-4 h-8 sm:font-medium text-white bg-gray-900 rounded-lg hover:shadow-md"
          >
            <p>Logout</p>
            <IoIosLogOut className="size-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
