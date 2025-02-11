import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { SlScreenTablet } from "react-icons/sl";
import { PiDeviceTabletCameraThin } from "react-icons/pi";
import { IoPlayOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiLoaderFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import PropTypes from "prop-types";

const Navbar = ({ handleToggleView, screenWidth, handlePublish, loading, mode, navigate }) => {
  return (
    <nav className="flex relative justify-between items-center px-2 w-full h-16 border-b border-b-gray-300 sm:px-6 lg:px-8">
      {/* Logo section */}
      <div className="flex gap-4 items-center">
        <GrHomeRounded className="text-2xl" />
        <section>
          <p className="text-lg">Si Her Brand</p>
          <p className="text-left">Home</p>
        </section>
      </div>
      {/* View section */}
      <div className="flex flex-1 justify-center items-center sm:items-stretch sm:justify-start">
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
      {/* Right section */}
      <div className="flex gap-4 items-center">
        <Link to="/preview">
          <div className="flex gap-2 justify-center items-center px-5 py-2 font-medium bg-transparent rounded-lg hover:bg-gray-200 hover:shadow-md">
            <IoPlayOutline className="text-black me-1" />
            Preview
          </div>
        </Link>
        {/* Update button */}
        <button
          onClick={handlePublish}
          className="flex gap-2 justify-center items-center px-5 py-2 font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 hover:shadow-md"
        >
          {loading && <RiLoaderFill className="animate-spin size-5" />}
          {loading ? "Loading..." : mode}
        </button>
        {/* Logout button */}
        <button
          onClick={() => {
            localStorage.removeItem("SI_HER");
            navigate("/auth/login");
          }}
          className="flex gap-2 justify-center items-center px-5 py-2 font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 hover:shadow-md"
        >
          <p>Logout</p>
          <IoIosLogOut className="" />
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  handleToggleView: PropTypes.func.isRequired,
  screenWidth: PropTypes.string.isRequired,
  handlePublish: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default Navbar;
