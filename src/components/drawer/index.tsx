import Landing from "./_Landing";
import MyValue from "./Value";
import Available from "./Available";
import Live from "./Live";
import Slider from "./_Slider";
import TimeLine from "./_Timeline";
import Orgs from "./_Orgs";

const DynamicComponent = ({ toggleDrawer, editPage }: { toggleDrawer: () => void; editPage: string }) => {
  const renderComponent = () => {
    switch (editPage) {
      case "landing":
        return <Landing toggleDrawer={toggleDrawer} />;
      case "slider":
        return <Slider toggleDrawer={toggleDrawer} />;
      case "value":
        return <MyValue toggleDrawer={toggleDrawer} />;
      case "live":
        return <Live toggleDrawer={toggleDrawer} />;
      case "timeline":
        return <TimeLine toggleDrawer={toggleDrawer} />;
      case "orgs":
        return <Orgs toggleDrawer={toggleDrawer} />;
      case "available":
        return <Available toggleDrawer={toggleDrawer} />;

      default:
        return null;
    }
  };
  return renderComponent();
};

export default DynamicComponent;
