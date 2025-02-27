import { memo } from "react";
import { RxCrossCircled } from "react-icons/rx";

interface DrawerHeaderProps {
  label: string;
  toggleDrawer: () => void;
}

const DrawerHeader = memo(({ label, toggleDrawer }: DrawerHeaderProps) => {
  return (
    <section className="flex justify-between items-center p-4 w-full bg-gray-100 border-b shadow-md border-b-gray-300">
      <p className="text-xl font-semibold tracking-wider">{label}</p>
      <button onClick={toggleDrawer}>
        <RxCrossCircled className="text-2xl text-gray-900 duration-300 hover:text-red-500 transition-color" />
      </button>
    </section>
  );
});

export default DrawerHeader;
