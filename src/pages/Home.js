import "../CSS/App.css";
import { GrHomeRounded } from "react-icons/gr";
import { useEffect, useState } from "react";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { SlScreenTablet } from "react-icons/sl";
import { PiDeviceTabletCameraThin } from "react-icons/pi";
import { IoPlayOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import Drawer from "react-modern-drawer";
import websiteContent from "../DataFiles/6abc2.js";
import "react-modern-drawer/dist/index.css";
import { IFrame } from "../components/IFrame/iframe";
import DynamicComponent from "../components/DynamicComponent/index.js";
import { useDispatch, useSelector } from "react-redux";
import { handleNewWebpage, handleWebsiteData } from "../reducers/contentReducer.js";
import { Link, useNavigate } from "react-router-dom";
import { cssPaths } from "../utils/constants.js";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
import WebPage from "../components/Webpage/index.js";
import { IoIosLogOut } from "react-icons/io";
import TopOfNavbar from "../components/TopNavbar/TopNavbar.js";

function Home() {
  const navigate = useNavigate();
  const { websiteData, isNewWebpage } = useSelector((state) => state.content);
  const [domainLoading, setDomainLoading] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState("100%");
  const [subDomain, setSubDomain] = useState("");
  const [isSubDomain, setIsSubDomain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPublishWebpage, setIsPublishWebpage] = useState(false);
  const [mode, setMode] = useState("Publish");
  const userData = JSON.parse(localStorage.getItem("SI_HER"));
  const [isOpen, setIsOpen] = useState("");
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleToggleView = (viewSize) => {
    setScreenWidth(viewSize);
  };
  const getWebsiteContent = async () => {
    try {
      setGetLoading(true);
      const { data } = await axiosInstance.get(`/api/webpage`);
      if (data?.subDomain) {
        setIsSubDomain(data?.subDomain);
      }
      if (!data?.data) {
        setIsPublishWebpage(false);
        dispatch(handleWebsiteData(websiteContent));
        setGetLoading(false);
        return;
      }
      setIsPublishWebpage(true);
      setMode("Update");
      setGetLoading(false);
      dispatch(handleNewWebpage(false));
      dispatch(handleWebsiteData(data?.data));
    } catch (error) {
      setGetLoading(false);
      console.log(error);
      if (error.response.status === 404) {
        dispatch(handleWebsiteData(websiteContent));
        return;
      }
      toast.error("Server error. Please refresh the page");
    }
  };
  useEffect(() => {
    if (!websiteData && userData) {
      getWebsiteContent();
    }
  }, [websiteData, userData]);
  const handleChange = (e) => {
    const value = e.target.value;
    setSubDomain(value);
    const regex = /\.?siher(?:\.eth)?(?:eth)?(?:eth\b|\b)/i;
    const containsInvalidCharacters = /[^a-zA-Z\s]/.test(value);
    if (regex.test(value) || containsInvalidCharacters) {
      setErrorMessage("Please enter only text without special characters or siher.eth variations.");
    } else {
      setErrorMessage("");
    }
  };

  const AssignDomain = async () => {
    try {
      setDomainLoading(true);
      const response = await axiosInstance.post(`/api/subDomain`, {
        subDomain: subDomain,
      });
      console.log(response);
      setDomainLoading(false);
      toast.success(`Domain assigned successfully`);
      setIsSubDomain(subDomain);
    } catch (error) {
      console.log(error);
      setDomainLoading(false);
      toast.error(
        error.response?.status === 404
          ? "Please publish the webpage before assigning a subDomain."
          : "Server error. Please try again!"
      );
    }
  };
  const handlePublish = async () => {
    try {
      setLoading(true);
      console.log(websiteData);
      const response = isNewWebpage
        ? await axiosInstance.post(`/api/webpage`, websiteData)
        : await axiosInstance.put(`/api/webpage`, websiteData);
      setLoading(false);
      toast.success(`Webpage ${isNewWebpage ? "created" : "updated"} successfully`);
      getWebsiteContent();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
        error.response?.status === 400 ? error.response.data : "Server error. Please try again!"
      );
    }
  };
  const hanbdleLogout = () => {
    localStorage.removeItem("SI_HER");
    navigate("/auth/login");
  };
  return (
    <div className="App">
      <TopOfNavbar />
      <nav className="top-10 z-10 w-full bg-white border border-b-gray-400">
        <div className="px-2 w-full sm:px-6 lg:px-8">
          <div className="flex relative justify-between items-center h-16">
            <div className="flex absolute inset-y-0 left-0 items-center sm:hidden">
              <button
                type="button"
                className="inline-flex relative justify-center items-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 justify-center items-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 gap-7 items-center">
                <div className="flex items-center">
                  <GrHomeRounded />
                  <div className="flex flex-col items-start ms-4">
                    <div>Si Her Brand</div>
                    <div className="text-sm">Home</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center w-full sm:ml-6">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <HiOutlineComputerDesktop
                      onClick={() => handleToggleView("100%")}
                      className="relative text-xl cursor-pointer"
                    />
                    {screenWidth === "100%" && (
                      <div
                        style={{
                          borderBottom: "3px solid #a020f0",
                          paddingBottom: "5px",
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <SlScreenTablet
                      onClick={() => handleToggleView("70%")}
                      className="relative text-xl cursor-pointer"
                    />
                    {screenWidth === "70%" && (
                      <div
                        style={{
                          borderBottom: "3px solid #a020f0",
                          paddingBottom: "5px",
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <PiDeviceTabletCameraThin
                      onClick={() => handleToggleView("40%")}
                      className="relative text-xl cursor-pointer"
                    />
                    {screenWidth === "40%" && (
                      <div
                        style={{
                          borderBottom: "3px solid #a020f0",
                          paddingBottom: "5px",
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link to="/preview">
                <button
                  type="button"
                  className="flex items-center px-5 py-1.5 mb-2 text-sm font-medium text-black rounded-lg border border-gray-600 focus:outline-none hover:bg-gray-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <IoPlayOutline className="text-black me-1" />
                  Preview
                </button>
              </Link>
              <div className="relative">
                <div>
                  <button
                    onClick={handlePublish}
                    type="button"
                    className="flex gap-2 justify-center items-center px-5 py-1.5 mx-5 mb-2 w-4/5 text-sm font-medium text-white bg-black rounded-lg border border-black focus:outline-none hover:bg-gray-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    {loading && (
                      <output>
                        <svg
                          aria-hidden="true"
                          className="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </output>
                    )}
                    <p>{mode}</p>
                    <GoDotFill className="mt-0.5 text-yellow-600 ms-1" />
                  </button>
                </div>
              </div>
              <div className="relative">
                <div>
                  <button
                    onClick={hanbdleLogout}
                    type="button"
                    className="flex gap-2 justify-center items-center px-5 py-1.5 mx-5 mb-2 w-4/5 text-sm font-medium text-white bg-black rounded-lg border border-black focus:outline-none hover:bg-gray-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    <p>Logout</p>

                    <IoIosLogOut className="mt-1 font-extrabold text-white ms-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isSubDomain ? (
        <div className="w-full flex justify-center items-center mx-auto absolute top-[170px] font-serif">
          <h3>Web page url: </h3>
          <a
            href={`https://${isSubDomain}.${process.env.REACT_APP_SIHER_DOMAIN}`}
            target="blank"
            className="font-serif text-blue-500 hover:underline ms-3"
          >{`https://${isSubDomain}.${process.env.REACT_APP_SIHER_DOMAIN}`}</a>
        </div>
      ) : (
        <form
          className={`w-full ${
            !isPublishWebpage && "opacity-50"
          }  flex flex-col justify-center items-center absolute top-24`}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-[35%] top-[110px] relative">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 items-center pointer-events-none start-0 ps-3">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                disabled={!isPublishWebpage}
                type="search"
                id="default-search"
                className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ps-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Submit your siher.eth domain of choice"
                value={subDomain}
                onChange={handleChange}
              />

              <div className="flex absolute inset-y-0 items-center pr-3 text-sm text-gray-500 pointer-events-none end-20 dark:text-gray-400">
                .siher.eth
              </div>
              <button
                disabled={domainLoading || errorMessage || !isPublishWebpage}
                onClick={AssignDomain}
                type="submit"
                className="flex absolute bottom-1 gap-3 justify-center items-center px-4 py-1.5 text-sm font-medium text-white bg-black rounded-lg border border-black disabled:opacity-80 hover:bg-gray-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 end-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                {domainLoading && (
                  <output>
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </output>
                )}
                Assign
              </button>
            </div>
          </div>
          {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
        </form>
      )}
      {getLoading ? (
        <output className="flex justify-center items-center mt-96 h-full">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </output>
      ) : (
        <div
          className={`flex items-center justify-center mt-40 bg-[#d5d5e3] ${
            isOpen
              ? "w-[74%] transition-width duration-500"
              : "w-[100%] transition-width duration-500"
          }`}
        >
          <div className={`duration-500 transition-width`} style={{ width: `${screenWidth}` }}>
            <IFrame
              width="100%"
              height="775"
              cssFiles={[
                cssPaths.index,
                cssPaths.app,
                cssPaths.responsive,
                cssPaths.navbar,
                cssPaths.landing,
                cssPaths.value,
                cssPaths.vision,
                cssPaths.CV,
                cssPaths.available,
              ]}
            >
              <WebPage setIsOpen={setIsOpen} />
            </IFrame>
          </div>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="right"
            size={350}
            enableOverlay={false}
          >
            <DynamicComponent isOpen={isOpen} toggleDrawer={toggleDrawer} />
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default Home;
