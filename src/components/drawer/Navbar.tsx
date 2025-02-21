import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
// import { handleWebsiteData } from "../../redux/contentSlice";
import { RootState } from "../../redux/store"; // Assuming you have a RootState type defined

interface NavbarFieldsProps {
  toggleDrawer: () => void;
}

const NavbarFields: React.FC<NavbarFieldsProps> = ({ toggleDrawer }) => {
  const { websiteData } = useSelector((state: RootState) => state.content);
  const dispatch = useDispatch();

  const handleInputChange = (fieldName: keyof typeof websiteData.navbar, value: string) => {
    const updatedNavbarData = { ...websiteData.navbar, [fieldName]: value };
    // dispatch(handleWebsiteData({ ...websiteData, navbar: updatedNavbarData }));
  };

  return (
    <div className="w-full bg-white">
      <div className="z-10 flex items-center justify-between w-full p-4 bg-gray-100 border border-b-gray-200">
        <p className="text-lg font-semibold">Navbar</p>
        <button onClick={toggleDrawer}>
          <RxCrossCircled className="text-2xl text-gray-600" />
        </button>
      </div>
      <div className="max-h-screen overflow-y-auto">
        <form className="mb-28">
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Website Name</p>
            <div className="w-full">
              <input
                value={websiteData?.navbar?.websiteName}
                type="text"
                id="websiteName"
                className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
                placeholder="SI HER"
                required
                onChange={(e) => handleInputChange("websiteName", e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NavbarFields;
