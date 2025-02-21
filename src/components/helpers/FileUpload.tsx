import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

interface FileUploadProps {
  image: string | File;
  handleDeleteImage: () => void;
  handleAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ image, handleDeleteImage, handleAddImage }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const renderImage = (): string => {
    if (typeof image === "object") {
      return URL.createObjectURL(image);
    } else {
      return image;
    }
  };

  return (
    <div className="relative w-36 h-36 cursor-pointer border border-gray-400 rounded-lg">
      <div className="absolute bg-red-500 rounded-full -top-4 -right-4 p-2 cursor-pointer">
        <RiDeleteBinLine className="text-sm text-white" onClick={handleDeleteImage} />
      </div>

      <input id="file-input" type="file" className="hidden" accept=".jpg, .jpeg, .png" onChange={handleAddImage} />

      <figure
        className={`transition-all duration-300 flex items-center justify-center h-full ${
          hovered ? "filter grayscale hover:grayscale-0" : ""
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <a href="#">
          <img className="rounded-lg object-cover w-full h-full" src={renderImage()} alt="image description" />
        </a>
      </figure>
    </div>
  );
};

export default FileUpload;
