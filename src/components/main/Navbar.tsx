import { useState, useEffect } from "react";
import { GrHomeRounded } from "react-icons/gr";
import Link from "next/link";
import { RiLoaderFill } from "react-icons/ri";
import { IoIosLogOut, IoIosCloseCircle } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
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
  const [loading, setLoading] = useState(false);
  const [visibleIframe, setVisibleIframe] = useState<string | null>(null);
  const [iframeLoading, setIframeLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const toggleIframe = (key: string) => {
    setVisibleIframe(key);
    setIframeLoading(true);
  };

  const closeIframe = () => {
    setVisibleIframe(null);
    setIframeLoading(false);
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeIframe();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePublish = async () => {
    try {
      setLoading(true);
      // API call logic goes here
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.status === 400 ? error.response.data : "Server error. Please try again!");
    }
  };

  return (
    <>
      <nav className="font-dm-sans border-b border-gray-300 sm:px-6 lg:px-8 bg-gray-100">
        <div className="flex relative justify-between items-center px-2 w-full p-1 lg:p-2 max-w-[90rem] mx-auto text-xs">
          {/* Logo Section */}
          <div className="flex gap-2 sm:gap-4 items-center">
            <GrHomeRounded className="size-5" />
            <p className="font-semibold mt-1">Si Her Publisher</p>
          </div>

          {/* Right Section */}
          <div className="flex gap-2 sm:gap-4 items-center">
            {/* Aurpay Tutorial Button */}
            <button
              type="button"
              onClick={() => toggleIframe("aurpay")}
              className="flex gap-2 items-center px-4 h-8 sm:font-medium border border-gray-600 rounded-lg hover:bg-gray-200 bg-white"
            >
              Aurpay Tutorial
            </button>

            {/* Preview Button */}
            <Link
              href="/preview"
              target="_blank"
              className="flex gap-2 items-center px-4 h-8 text-white bg-gray-900 rounded-lg hover:shadow-md"
            >
              <FaPlay className="size-3" />
              Preview
            </Link>

            {/* Publish Button */}
            <button
              type="button"
              onClick={handlePublish}
              className="flex gap-2 items-center px-4 h-8 sm:font-medium text-white bg-gray-900 rounded-lg hover:shadow-md"
            >
              <div className="bg-emerald-400 size-2 rounded-full" />
              Publish
              {loading && <RiLoaderFill className="animate-spin size-5" />}
            </button>

            {/* Logout Button */}
            <button
              type="button"
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

      {/* Iframe Modal */}
      {visibleIframe === "aurpay" && (
        <div
          className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-60"
          onClick={closeIframe}
        >
          <div
            className="relative p-5 w-4/5 max-w-2xl bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {!iframeLoading && (
              <button onClick={closeIframe} className="absolute top-1 right-1">
                <IoIosCloseCircle className="text-red-500 size-10 hover:text-red-600" />
              </button>
            )}
            {iframeLoading && (
              <div className="flex justify-center items-center h-96">
                <div className="w-16 h-16 rounded-full border-t-4 border-blue-500 animate-spin" />
              </div>
            )}
            <iframe
              src="https://player.vimeo.com/video/929334312?badge=0&autopause=0&player_id=0&app_id=58479"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title="Aurpay Tutorial"
              className={`w-full h-96 border border-gray-300 ${iframeLoading ? "hidden" : "block"}`}
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
