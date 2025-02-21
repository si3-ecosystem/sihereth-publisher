import Navbar from "./Navbar";
import Landing from "./Landing";
import MyValue from "./Value";
import Cv from "./Cv";
import Available from "./Available";
import Live from "./Live";

const DynamicComponent = ({ toggleDrawer, editPage }: { toggleDrawer: () => void; editPage: string }) => {
  const renderComponent = () => {
    switch (editPage) {
      case "navbar":
        return <Navbar toggleDrawer={toggleDrawer} />;
      case "landing":
        return <Landing toggleDrawer={toggleDrawer} />;
      case "value":
        return <MyValue toggleDrawer={toggleDrawer} />;
      case "live":
        return <Live toggleDrawer={toggleDrawer} />;
      case "CV":
        return <Cv toggleDrawer={toggleDrawer} />;
      case "available":
        return <Available toggleDrawer={toggleDrawer} />;
      default:
        return null;
    }
  };
  return renderComponent();
};

export default DynamicComponent;
