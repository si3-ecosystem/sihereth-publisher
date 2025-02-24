import Navbar from "./Navbar";
import Landing from "./Landing";
import MyValue from "./Value";
import Cv from "./Cv";
import Available from "./Available";
import Live from "./Live";
import { ContentState } from "@/utils/types";

const DynamicComponent = ({
  toggleDrawer,
  editPage,
  content
}: {
  toggleDrawer: () => void;
  editPage: string;
  content: ContentState;
}) => {
  const renderComponent = () => {
    switch (editPage) {
      case "navbar":
        return <Navbar toggleDrawer={toggleDrawer} />;
      case "landing":
        return <Landing toggleDrawer={toggleDrawer} data={content.landing} />;
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
