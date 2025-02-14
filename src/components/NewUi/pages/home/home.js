import Navbar from "../../Navbar/Navbar";
import Value from "../Value/value";
import Live from "../Live/live";
import AutoScrollSlider from "../../AutoScrollSlider/AutoScrollSlider";
import Orgs from "../../orgs/Orgs";
import TimeLine from "../time-line/time-line";
import ImgScroller from "../../ImgScroller/ImgScroller";
import Available from "../Available/Available";
import Footer from "../../Footer/Footer";
import Info from "../info/Info";

function Home({ setIsOpen }) {
  return (
    <div className="px-4">
      <Navbar />
      <button
        onClick={() => setIsOpen("landing")}
        className="border border-transparent hover:border-gray-400"
      >
        <Info />
        <AutoScrollSlider />
      </button>
      <section id="value">
        <button
          onClick={() => setIsOpen("value")}
          className="border border-transparent hover:border-gray-400"
        >
          <Value />
        </button>
      </section>
      <section id="live">
        <button
          onClick={() => setIsOpen("live")}
          className="w-full border border-transparent hover:border-gray-400"
        >
          <Live />
          <Orgs />
        </button>
      </section>
      <section id="timeline">
        <button
          onClick={() => setIsOpen("CV")}
          className="border border-transparent hover:border-gray-400"
        >
          <TimeLine />
          <ImgScroller />
          <Available />
        </button>
      </section>
      <section id="connect">
        <button
          onClick={() => setIsOpen("available")}
          className="w-full border border-transparent hover:border-gray-400"
        >
          <Footer />
        </button>
      </section>
    </div>
  );
}

export default Home;
