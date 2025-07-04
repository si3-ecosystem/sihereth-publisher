import { useState, useEffect, useCallback } from "react";
import { GrHomeRounded } from "react-icons/gr";
import Link from "next/link";
import { RiLoaderFill } from "react-icons/ri";
import { IoIosLogOut, IoIosCloseCircle } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setIsNewWebpage } from "@/redux/contentSlice";
import apiClient from "@/utils/interceptor";
import { handleCompleteLogout, type RootState } from "@/redux/store";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [visibleIframe, setVisibleIframe] = useState<string | null>(null);
  const isNewWebpage = useSelector((state: RootState) => state.content.isNewWebpage);
  const [iframeLoading, setIframeLoading] = useState(false);

  console.log("is new", isNewWebpage);
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useStore();

  const handlePublish = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const contentData = (store.getState() as RootState).content;
      const publishData = {
        landing: contentData.landing,
        slider: contentData.slider,
        value: contentData.value,
        live: contentData.live,
        organizations: contentData.organizations,
        timeline: contentData.timeline,
        available: contentData.available,
        socialChannels: contentData.socialChannels
      };
      const url = isNewWebpage ? "/webcontent/publish" : "/webcontent/update";
      const response = await apiClient.post(url, publishData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Content published successfully!");
        dispatch(setIsNewWebpage(false));
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error: any) {
      console.error("Publish error:", error);
      let errorMessage = "";
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message ?? error.response.data ?? "Bad request";
      } else if (error.response?.status === 401) {
        await handleCompleteLogout();
        router.replace("/login");
        return;
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please try again.";
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loading, dispatch, router, store]);

  const toggleIframe = useCallback((key: string) => {
    setVisibleIframe(key);
    setIframeLoading(true);
  }, []);

  const closeIframe = useCallback(() => {
    setVisibleIframe(null);
    setIframeLoading(false);
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIframeLoading(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await handleCompleteLogout();
    router.replace("/login");
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && visibleIframe) {
        closeIframe();
      }
    };
    if (visibleIframe) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [visibleIframe, closeIframe]);

  useEffect(() => {
    if (visibleIframe) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visibleIframe]);

  let buttonText = "";
  if (loading) {
    buttonText = !isNewWebpage ? "Updating..." : "Publishing...";
  } else {
    buttonText = !isNewWebpage ? "Update" : "Publish";
  }

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
              className="flex gap-2 items-center px-4 h-8 sm:font-medium border border-gray-600 rounded-lg hover:bg-gray-200 bg-white transition-colors duration-200"
              aria-label="Open Aurpay Tutorial"
            >
              Aurpay Tutorial
            </button>
            {/* Preview Button */}
            <Link
              href="/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center px-4 h-8 text-white bg-gray-900 rounded-lg hover:shadow-md transition-shadow duration-200"
              aria-label="Preview content in new tab"
            >
              <FaPlay className="size-3" />
              Preview
            </Link>
            {/* Publish Button */}
            <button
              type="button"
              onClick={handlePublish}
              disabled={loading}
              className="flex gap-2 items-center px-4 h-8 sm:font-medium text-white bg-gray-900 rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Publish content"
            >
              <div className={`size-2 rounded-full ${loading ? "bg-yellow-400" : "bg-emerald-400"}`} />
              {buttonText}
              {loading && <RiLoaderFill className="animate-spin size-5 ml-1" />}
            </button>
            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex gap-2 items-center px-4 h-8 sm:font-medium text-white bg-gray-900 rounded-lg hover:shadow-md transition-shadow duration-200"
              aria-label="Logout"
            >
              <span>Logout</span>
              <IoIosLogOut className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Iframe Modal */}
      {visibleIframe === "aurpay" && (
        <div
          className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={closeIframe}
          role="dialog"
          aria-modal="true"
          aria-labelledby="iframe-title"
        >
          <div
            className="relative p-5 w-4/5 max-w-2xl bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {!iframeLoading && (
              <button onClick={closeIframe} className="absolute top-1 right-1 z-10" aria-label="Close tutorial">
                <IoIosCloseCircle className="text-red-500 size-10 hover:text-red-600 transition-colors duration-200" />
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
              id="iframe-title"
              className={`w-full h-96 border border-gray-300 rounded ${iframeLoading ? "hidden" : "block"}`}
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
