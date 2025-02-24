import { RiLoaderFill } from "react-icons/ri";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RiLoaderFill className="text-4xl animate-spin text-gray-800" />
    </div>
  );
};

export default Loading;
