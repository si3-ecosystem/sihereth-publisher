import Navbar from "./Nav";
import Landing from "./Landing";
import Slider from "./Slider";
import Value from "./Value";
import Live from "./Live";
import Orgs from "./Orgs";
import TimeLine from "./Timeline";

const Home = ({ setEditPage, openDrawer }: { setEditPage: (section: string) => void; openDrawer: () => void }) => {
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
      <section id="value" onClick={() => setEditPage("value")}>
        <Value />
      </section>
      {/* Live section */}
      <section id="live" onClick={() => setEditPage("live")}>
        <Live />
      </section>
      {/* Orgs section */}
      <section id="orgs" onClick={() => setEditPage("orgs")}>
        <Orgs />
      </section>
      {/* Timeline section */}
      <section id="timeline" onClick={() => setEditPage("CV")}>
        <TimeLine />
        {/* <ImgScroller />
        <Available /> */}
      </section>
      {/* Connect section */}
      <section id="connect" onClick={() => setEditPage("available")}>
        {/* <Footer /> */}
      </section>
    </div>
  );
};

export default Home;
