import Navbar from "@/components/sections/Nav";
import Landing from "@/components/sections/Landing";
import Slider from "@/components/sections/Slider";
import Value from "@/components/sections/Value";
import Live from "@/components/sections/Live";
import Orgs from "@/components/sections/Orgs";
import TimeLine from "@/components/sections/Timeline";
import People from "@/components/sections/People";
import Available from "@/components/sections/Available";
import Text from "@/components/sections/Text";
import Footer from "@/components/sections/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <Slider />
      <Value />
      <Live />
      <Orgs />
      <TimeLine />
      <People />
      <Available />
      <Text />
      <Footer />
    </>
  );
};

export default Home;
