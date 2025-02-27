import Navbar from "./Nav";
import Landing from "./Landing";
import Slider from "./Slider";
import Value from "./Value";

interface HomeProps {
  setEditPage: (section: string) => void;
  openDrawer: () => void;
}

const Home = ({ setEditPage, openDrawer }: HomeProps) => {
  return (
    <div className="px-4">
      <Navbar />
      {/* Landing section */}
      <section
        id="landing"
        onClick={() => {
          setEditPage("landing");
          openDrawer();
        }}
      >
        <Landing />
      </section>
      {/* Slider section */}
      <section
        id="slider"
        onClick={() => {
          setEditPage("slider");
          openDrawer();
        }}
        className="cursor-default"
      >
        <Slider />
      </section>
      {/* Value section */}
      <section id="value">
        <div onClick={() => setEditPage("value")} className="hover:bg-gray-50">
          <Value />
        </div>
      </section>
      {/* Live section */}
      <section id="live">
        <button onClick={() => setEditPage("live")} className="w-full border border-transparent hover:border-gray-400">
          {/* <Live />
          <Orgs /> */}
        </button>
      </section>
      {/* Timeline section */}
      <section id="timeline">
        <button onClick={() => setEditPage("CV")} className="border border-transparent hover:border-gray-400">
          {/* <TimeLine />
          <ImgScroller />
          <Available /> */}
        </button>
      </section>
      {/* Connect section */}
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
