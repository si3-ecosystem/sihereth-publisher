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
import Text from "./Text";

const Home = ({ setEditPage, openDrawer }: { setEditPage: (section: string) => void; openDrawer: () => void }) => {
  return (
    <>
      <Navbar />
      {/* Landing section */}
      <section
        id="landing"
        onKeyDown={() => {}}
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
        onKeyDown={() => {}}
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
        onKeyDown={() => {}}
        onClick={() => {
          setEditPage("value");
          openDrawer();
        }}
      >
        <Value />
      </section>
      {/* Live section */}
      <section
        id="media"
        onKeyDown={() => {}}
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
        onKeyDown={() => {}}
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
        onKeyDown={() => {}}
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
        onKeyDown={() => {}}
        onClick={() => {
          setEditPage("available");
          openDrawer();
        }}
      >
        <Available />
      </section>
      {/* Text section */}
      <Text />
      {/* Footer section */}
      <section
        id="footer"
        onKeyDown={() => {}}
        onClick={() => {
          setEditPage("footer");
          openDrawer();
        }}
      >
        <Footer />
      </section>
    </>
  );
};

export default Home;
