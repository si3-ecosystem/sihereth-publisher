import Navbar from "./Nav";
import Landing from "./Landing";
import Slider from "./Slider";
import Value from "./Value";
import Live from "./Live";
import Orgs from "./Orgs";
import TimeLine from "./Timeline";
import People from "./People";
import Available from "./Available";
import Footer from "./Footer";

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
      <section
        id="value"
        onClick={() => {
          setEditPage("value");
          openDrawer();
        }}
      >
        <Value />
      </section>
      {/* Live section */}
      <section
        id="live"
        onClick={() => {
          setEditPage("live");
          openDrawer();
        }}
      >
        <Live />
      </section>
      {/* Orgs section */}
      <section
        id="orgs"
        onClick={() => {
          setEditPage("orgs");
          openDrawer();
        }}
      >
        <Orgs />
      </section>
      {/* Timeline section */}
      <section
        id="timeline"
        onClick={() => {
          setEditPage("timeline");
          openDrawer();
        }}
      >
        <TimeLine />
      </section>
      {/* People section */}
      <section id="people">
        <People />
      </section>
      {/* Available section */}
      <section
        id="available"
        onClick={() => {
          setEditPage("available");
          openDrawer();
        }}
      >
        <Available />
      </section>
      {/* Footer section */}
      <section id="footer" onClick={() => setEditPage("footer")}>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
