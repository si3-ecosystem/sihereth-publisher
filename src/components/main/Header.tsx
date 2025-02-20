import { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface Button {
  label: string;
  key: string;
  src: string;
}

const Header: React.FC = () => {
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
      label: "Audiogram Tutorial",
      key: "livepeer",
      src: "https://player.vimeo.com/video/929333857?badge=0&autopause=0&player_id=0&app_id=58479"
    },
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
    <div className="flex gap-40 items-center w-full h-20 text-gray-900 border-b border-gray-300">
      {/* Left Section */}
      <section className="flex relative flex-1 justify-center items-center w-4/5 max-w-4/5">
        <p className="mx-auto text-lg">Tutorial Videos</p>
        {buttons.slice(0, 2).map(({ label, key }) => (
          <button
            key={key}
            onClick={() => toggleIframe(key)}
            className="px-5 mx-2 w-44 h-12 text-sm font-medium rounded-md border border-gray-900 hover:bg-gray-100 focus:outline-none hover:shadow-md"
          >
            {label}
          </button>
        ))}
      </section>
      {/* Right Section */}
      <section className="flex relative flex-1 justify-center items-center h-full">
        {buttons.slice(2).map(({ label, key }) => (
          <button
            key={key}
            onClick={() => toggleIframe(key)}
            className="px-5 mx-2 w-44 h-12 text-sm font-medium rounded-md border border-black hover:bg-gray-100 focus:outline-none hover:shadow-md"
          >
            {label}
          </button>
        ))}
        <p className="mx-auto text-lg">Si Her Speak</p>
      </section>
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
                <div className="w-16 h-16 rounded-full border-t-4 border-blue-500 animate-spin"></div>
              </div>
            )}
            <iframe
              src={buttons.find((b) => b.key === visibleIframe)?.src}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title={visibleIframe}
              className={`w-full h-96 border border-gray-300 ${loading ? "hidden" : "block"}`}
              onLoad={handleIframeLoad}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
