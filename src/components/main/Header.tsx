import { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface Button {
  label: string;
  key: string;
  src: string;
}

const Header = () => {
  const [visibleIframe, setVisibleIframe] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleIframe = (iframe: string) => {
    setVisibleIframe(iframe);
    setLoading(true);
  };

  const closeIframe = () => {
    setVisibleIframe(null);
    setLoading(false);
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeIframe();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const buttons: Button[] = [
    {
      label: "Aurpay Tutorial",
      key: "aurpay",
      src: "https://player.vimeo.com/video/929334312?badge=0&autopause=0&player_id=0&app_id=58479"
    },
    {
      label: "Conferences",
      key: "conferences",
      src: "https://airtable.com/embed/appGIQrU1Lv6MOgvQ/shrYDbZ9YLA7S51zy?viewControls=on"
    },
    {
      label: "Podcasts",
      key: "podcasts",
      src: "https://airtable.com/embed/appGIQrU1Lv6MOgvQ/shrb3cmaWpPv6IEi1?viewControls=on"
    }
  ];

  return (
    <div className="bg-gray-100 border-b border-gray-300">
      <div className="max-w-[90rem] mx-auto flex font-dm-sans justify-center items-center w-full text-gray-900 gap-2 text-xs p-1 lg:p-2">
        {buttons.map(({ label, key }) => (
          <button
            type="button"
            key={key}
            onClick={() => toggleIframe(key)}
            className="py-1 lg:py-2 w-full lg:w-32 font-light md:font-medium rounded-md border border-gray-600 hover:bg-gray-100 focus:outline-none hover:shadow-md whitespace-nowrap"
          >
            {label}
          </button>
        ))}
      </div>
      {/* Modal for Iframe */}
      {visibleIframe && (
        <div
          className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-60"
          onClick={closeIframe}
        >
          <div
            className="relative p-5 w-4/5 max-w-2xl bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {!loading && (
              <button onClick={closeIframe} className="absolute top-1 right-1">
                <IoIosCloseCircle className="text-red-500 size-10 hover:text-red-600" />
              </button>
            )}
            {loading && (
              <div className="flex justify-center items-center h-96">
                <div className="w-16 h-16 rounded-full border-t-4 border-blue-500 animate-spin" />
              </div>
            )}
            <iframe
              src={buttons.find((b) => b.key === visibleIframe)?.src}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title={visibleIframe}
              className={`w-full h-96 border border-gray-300 ${loading ? "hidden" : "block"}`}
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
