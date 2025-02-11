import { GrDomain } from "react-icons/gr";
import { useEffect, useState, useCallback } from "react";
import Drawer from "react-modern-drawer";
import websiteContent from "../DataFiles/6abc2.js";
import "react-modern-drawer/dist/index.css";
import { IFrame } from "../components/IFrame/iframe";
import DynamicComponent from "../components/DynamicComponent/index.js";
import { useDispatch, useSelector } from "react-redux";
import { handleNewWebpage, handleWebsiteData } from "../reducers/contentReducer.js";
import { useNavigate } from "react-router-dom";
import { cssPaths } from "../utils/constants.js";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
import WebPage from "../components/Webpage/index.js";
import Header from "../components/main/Header.jsx";
import { RiLoaderFill } from "react-icons/ri";
import Navbar from "../components/main/Nav.jsx";

function Home() {
  // States
  const navigate = useNavigate();
  const { websiteData, isNewWebpage } = useSelector((state) => state.content);
  const [domainLoading, setDomainLoading] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState("100%");
  const [subDomain, setSubDomain] = useState("");
  const [isSubDomain, setIsSubDomain] = useState("");
  const [errorMessage, setErrorMessage] = useState("error");
  const [isPublishWebpage, setIsPublishWebpage] = useState(false);
  const [mode, setMode] = useState("Publish");
  const userData = JSON.parse(localStorage.getItem("SI_HER"));
  const [isOpen, setIsOpen] = useState("");
  const toggleDrawer = () => setIsOpen((prevState) => !prevState);
  const handleToggleView = (viewSize) => setScreenWidth(viewSize);

  const getWebsiteContent = useCallback(async () => {
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
  }, [dispatch]);

  useEffect(() => {
    if (!websiteData && userData) {
      getWebsiteContent();
    }
  }, [websiteData, userData, getWebsiteContent]);

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
      await axiosInstance.post(`/api/subDomain`, { subDomain });
      toast.success("Domain assigned successfully");
      setIsSubDomain(subDomain);
    } catch (error) {
      console.log("Error assigning domain:", error);
      let errorMessage;
      if (error.response?.data === "Subdomain Already registered") {
        errorMessage = "Subdomain Already registered";
      } else if (error.response?.status === 404) {
        errorMessage = "Please publish the webpage before assigning a subdomain.";
      } else {
        errorMessage = "Server error. Please try again!";
      }
      toast.error(errorMessage);
    } finally {
      setDomainLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      console.log(websiteData);
      // const response = isNewWebpage
      //   ? await axiosInstance.post(`/api/webpage`, websiteData)
      //   : await axiosInstance.put(`/api/webpage`, websiteData);
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

  return (
    <div className="h-screen">
      {/* Header */}
      <Header />
      {/* Navbar */}
      <Navbar
        handleToggleView={handleToggleView}
        screenWidth={screenWidth}
        handlePublish={handlePublish}
        loading={loading}
        mode={mode}
        navigate={navigate}
      />
      {/* Domain section */}
      <div className="flex justify-center items-center py-4 mx-auto w-full font-serif text-lg tracking-wider border-b border-gray-300 shadow-md">
        {isSubDomain ? (
          <>
            <p>Web page url: </p>
            <a
              href={`https://${isSubDomain}.${process.env.REACT_APP_SIHER_DOMAIN}`}
              target="blank"
              className="ml-2 font-serif text-blue-600 hover:underline underline-offset-2"
            >{`https://${isSubDomain}.${process.env.REACT_APP_SIHER_DOMAIN}`}</a>
          </>
        ) : (
          <section className="items-center w-[40%] relative text-lg flex border text-gray-500 hover:text-gray-700 border-gray-300 rounded-lg hover:border-gray-500 justify-between">
            <div className="flex justify-center items-center w-full">
              <GrDomain className="ml-4 size-8" />
              <input
                disabled={!isPublishWebpage}
                type="text"
                className="w-full leading-4 text-gray-900 border-none outline-none focus:ring-0"
                placeholder="Submit your siher.eth domain of choice"
                value={subDomain}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center items-center">
              <p className="mr-4 text-gray-500">.siher.eth</p>
              <button
                disabled={domainLoading || errorMessage || !isPublishWebpage}
                onClick={AssignDomain}
                className="flex gap-3 justify-center items-center px-3 py-1 w-max text-white bg-black rounded-lg border border-black disabled:opacity-80 hover:bg-opacity-80 focus:outline-none focus:ring-none hover:shadow-md"
              >
                {domainLoading && <RiLoaderFill className="animate-spin size-5" />}
                {domainLoading ? "Loading..." : "Publish your domain"}
              </button>
            </div>
          </section>
        )}
      </div>
      {/* Page View */}
      {getLoading ? (
        <div className="flex justify-center items-center w-full h-96">
          <RiLoaderFill className="text-gray-900 animate-spin size-12" />
        </div>
      ) : (
        <div className={`transition-width duration-500 ${isOpen ? "w-[75%]" : "w-[100%]"}`}>
          <div style={{ width: `${screenWidth}` }}>
            <IFrame
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
            size="25%"
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
