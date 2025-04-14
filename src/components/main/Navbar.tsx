import { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import Link from "next/link";
import { RiLoaderFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { FaDesktop, FaTabletAlt, FaMobileAlt, FaPlay } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import apiClient from "@/utils/interceptor";

type ViewMode = "mobile" | "tablet" | "desktop";

interface NavbarProps {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
}

const Navbar = ({ viewMode, setViewMode }: NavbarProps) => {
  const data = useSelector((state: RootState) => state.content ?? []);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePublish = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      // Only append files that have been changed by user
      if (typeof data.landing.image === "object") {
        formData.append("landing_image", data.landing.image.file);
      }
      if (typeof data.live.image === "object") {
        formData.append("live_image", data.live.image.file);
      }
      if (typeof data.live.video === "object") {
        formData.append("live_video", data.live.video.file);
      }
      data.organizations.forEach((org, index) => {
        if (typeof org === "object") {
          formData.append(`org_image_${index}`, org.file);
        }
      });
      formData.append("data", JSON.stringify(data));
      const response = await (data.isNewWebpage
        ? apiClient.post("/webcontent/publish", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
        : apiClient.put("/webcontent/update", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }));
      console.log(response);
      setLoading(false);
    } catch (error: unknown) {
      console.log(error);
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Server error. Please try again!");
      }
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
  );
};

export default Navbar;
