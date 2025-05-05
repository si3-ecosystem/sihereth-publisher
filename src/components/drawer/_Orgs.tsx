"use client";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus, FaUpload } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import DrawerHeader from "./DrawerHeader";
import { useSelector, useDispatch } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { useRef } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { inputStyles } from "@/utils/customStyles";

// Maximum number of organizations allowed
const MAX_ORGS = 5;
const MIN_ORGS = 1;

const OrgsFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const organizations = useSelector((state: RootState) => state.content.organizations);

  // Creating refs for file inputs to avoid recreating them on each render
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const validateFile = (file: File): boolean => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!validTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, and JPEG images are allowed.");
      return false;
    }

    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds 1MB.");
      return false;
    }

    return true;
  };

  const handleImageUpload = (index: number, file: File) => {
    if (!validateFile(file)) return;

    const imageUrl = URL.createObjectURL(file);

    // Create a new array with the updated item
    const updatedOrgs = [...organizations];
    updatedOrgs[index] = imageUrl;

    // Update the entire organizations array
    dispatch(
      updateContent({
        section: "organizations",
        data: updatedOrgs
      })
    );

    toast.success("Organization image updated");
  };

  const addOrganization = () => {
    if (organizations.length >= MAX_ORGS) {
      toast.error(`You can add a maximum of ${MAX_ORGS} organizations.`);
      return;
    }

    // Create a new array with an empty string added
    const updatedOrgs = [...organizations, ""];

    // Update the entire organizations array
    dispatch(
      updateContent({
        section: "organizations",
        data: updatedOrgs
      })
    );
  };

  const removeOrganization = (index: number) => {
    if (organizations.length <= MIN_ORGS) {
      toast.error(`You must have at least ${MIN_ORGS} organization${MIN_ORGS > 1 ? "s" : ""}.`);
      return;
    }

    // Create a new array without the removed item
    const updatedOrgs = organizations.filter((_, i) => i !== index);

    // Update the entire organizations array
    dispatch(
      updateContent({
        section: "organizations",
        data: updatedOrgs
      })
    );
  };

  return (
    <>
      <DrawerHeader label="Organizations Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4 xl:p-6">
          <div className="flex flex-col gap-4">
            {organizations.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-dashed p-6 rounded-lg">
                <p className="text-gray-400">No organizations added yet</p>
                <button
                  type="button"
                  className="flex gap-2 items-center mt-2 text-[#a020f0] hover:text-purple-700"
                  onClick={addOrganization}
                >
                  <FaCirclePlus className="size-3" />
                  <span className="text-xs">Add your first organization</span>
                </button>
              </div>
            ) : (
              <>
                {organizations.map((item, index) => (
                  <div
                    key={`org-${index}`}
                    className={`${inputStyles} flex gap-4 justify-between items-center w-full p-3`}
                  >
                    <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                      {item ? (
                        <Image
                          src={item}
                          alt={`Organization ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <div className="text-gray-400 text-center text-xs">
                          No image
                          <br />
                          uploaded
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 items-center">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                        id={`upload-org-${index}`}
                        ref={(el) => {
                          fileInputRefs.current[index] = el;
                        }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(index, e.target.files[0]);
                          }
                        }}
                      />

                      <label
                        htmlFor={`upload-org-${index}`}
                        className="flex items-center gap-1 py-1 px-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 cursor-pointer transition-colors"
                        aria-label={item ? "Change organization image" : "Upload organization image"}
                      >
                        {item ? (
                          <>
                            <FaRegEdit className="size-3" />
                            <span className="text-xs">Edit</span>
                          </>
                        ) : (
                          <>
                            <FaUpload className="size-3" />
                            <span className="text-xs">Upload</span>
                          </>
                        )}
                      </label>

                      {organizations.length > 1 && (
                        <button
                          type="button"
                          className="flex items-center gap-1 py-1 px-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                          onClick={() => removeOrganization(index)}
                          aria-label={`Remove organization ${index + 1}`}
                        >
                          <RiDeleteBinLine className="size-3" />
                          <span className="text-xs">Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add Organization button always appears below the cards when not at max */}
                {organizations.length < MAX_ORGS && (
                  <button
                    type="button"
                    className="flex gap-2 items-center text-[#a020f0] hover:text-purple-700 p-3 rounded-lg w-full mt-2"
                    onClick={addOrganization}
                    aria-label="Add organization"
                  >
                    <FaCirclePlus className="size-4" />
                    <span>Add Organization</span>
                  </button>
                )}

                {/* Add the helper text here, for all users, under the add button */}
                <span className="text-[10px] text-red-500 opacity-70">
                  Only .png, .jpg, .jpeg images allowed. Max size 1MB.
                </span>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default OrgsFields;
