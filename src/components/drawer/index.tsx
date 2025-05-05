import Landing from "./_Landing";
import MyValue from "./_Value";
import Slider from "./_Slider";
import TimeLine from "./_Timeline";
import Orgs from "./_Orgs";
import Available from "./_Available";
import Live from "./_Live";
import Footer from "./_Footer";

const DynamicComponent = ({ toggleDrawer, editPage }: { toggleDrawer: () => void; editPage: string }) => {
  const renderComponent = () => {
    switch (editPage) {
      case "landing":
        return <Landing toggleDrawer={toggleDrawer} />;
      case "slider":
        return <Slider toggleDrawer={toggleDrawer} />;
      case "value":
        return <MyValue toggleDrawer={toggleDrawer} />;
      case "timeline":
        return <TimeLine toggleDrawer={toggleDrawer} />;
      case "orgs":
        return <Orgs toggleDrawer={toggleDrawer} />;
      case "available":
        return <Available toggleDrawer={toggleDrawer} />;
      case "live":
        return <Live toggleDrawer={toggleDrawer} />;
      case "footer":
        return <Footer toggleDrawer={toggleDrawer} />;
      default:
        return null;
    }
  };
  return renderComponent();
};

export default DynamicComponent;
