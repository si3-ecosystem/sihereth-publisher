import Navbar from "./Nav";
import Landing from "./Landing";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface HomeProps {
  setEditPage: (section: string) => void;
  openDrawer: () => void;
}

const Home: React.FC<HomeProps> = ({ setEditPage, openDrawer }) => {
  const content = useSelector((state: RootState) => state.content);
  console.log("content", content);

  return (
    <div className="px-4 font-clash-display">
      <Navbar />
      <span
        onClick={() => {
          setEditPage("landing");
          openDrawer();
        }}
        className="border border-transparent hover:border-gray-400"
      >
        <Landing data={content.landing} />
        {/* <Info />
        <AutoScrollSlider /> */}
      </span>
      <section id="value">
        <button onClick={() => setEditPage("value")} className="border border-transparent hover:border-gray-400">
          {/* <Value /> */}
        </button>
      </section>
      <section id="live">
        <button onClick={() => setEditPage("live")} className="w-full border border-transparent hover:border-gray-400">
          {/* <Live />
          <Orgs /> */}
        </button>
      </section>
      <section id="timeline">
        <button onClick={() => setEditPage("CV")} className="border border-transparent hover:border-gray-400">
          {/* <TimeLine />
          <ImgScroller />
          <Available /> */}
        </button>
      </section>
      <section id="connect">
        <button
          onClick={() => setEditPage("available")}
          className="w-full border border-transparent hover:border-gray-400"
        >
          {/* <Footer /> */}
        </button>
      </section>
    </div>
  );
};

export default Home;
