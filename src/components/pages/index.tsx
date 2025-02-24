import Navbar from "./Nav";
import Landing from "./Landing";
import { ContentState } from "@/utils/types";
import Slider from "./Slider";
import Value from "./Value";

interface HomeProps {
  setEditPage: (section: string) => void;
  openDrawer: () => void;
  content: ContentState;
}

const Home: React.FC<HomeProps> = ({ setEditPage, openDrawer, content }) => {
  return (
    <div className="px-4 font-clash-display">
      <Navbar />
      <div
        onClick={() => {
          setEditPage("landing");
          openDrawer();
        }}
        className="hover:bg-gray-50"
      >
        <Landing data={content.landing} />
        <Slider />
      </div>
      <section id="value">
        <div onClick={() => setEditPage("value")} className="hover:bg-gray-50">
          <Value />
        </div>
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
