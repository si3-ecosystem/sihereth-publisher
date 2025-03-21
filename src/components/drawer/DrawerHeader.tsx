import { memo } from "react";
import { RxCrossCircled } from "react-icons/rx";

interface DrawerHeaderProps {
  label: string;
  toggleDrawer: () => void;
}

const DrawerHeader = memo(({ label, toggleDrawer }: DrawerHeaderProps) => {
  return (
    <section className="flex font-dm-sans justify-between items-center p-3 w-full bg-gray-100 border-b shadow-md border-b-gray-300">
      <p className="font-semibold tracking-wide">{label}</p>
      <button onClick={toggleDrawer}>
        <RxCrossCircled className="text-xl text-gray-900 duration-300 hover:text-red-500 transition-color" />
      </button>
    </section>
  );
});

export default DrawerHeader;
