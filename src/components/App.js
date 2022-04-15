import React, { useEffect, useState, useRef } from "react";
import HomePage from "./HomePage";
import NavigationBar from "./NavigationBar";
import Route from "./routing/Route";
import axios from "axios";
import AboutUs from "./AboutUs";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import useLocation from "./hooks/useLocation";
import "./styling.css";

const App = () => {
  const defLoc = "Israel";
  const [emergencyClicked, setEmergencyClicked] = useState(false);
  const [location, setLocation] = useLocation(defLoc, emergencyClicked);
  const [emergencyLoc, setEmergencyLoc] = useState("");
  const [isTopButtonVisible, setIsTopButtonVisible] = useState(false);
  const topElementRef = useRef();

  const makeEmerReq = async () => {
    const { data } = await axios.get("https://easymed-app.herokuapp.com/emergency/");
    setEmergencyLoc(data.name);
  };

  useEffect(() => {
    window.addEventListener("scroll", onToggleScrollButtonVisible);

  }, []);

  const onToggleScrollButtonVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled > 200 ? setIsTopButtonVisible(true) : setIsTopButtonVisible(false);
  };

  useEffect(() => {
    emergencyClicked ? setLocation(emergencyLoc) : setLocation(defLoc);
  }, [emergencyClicked]);

  const onEmergencyClick = () => {
    setEmergencyClicked(!emergencyClicked);
  };

  useEffect(() => makeEmerReq(), []);
  return (
    <div className="main" ref={topElementRef}>
      <NavigationBar
        emergencyClicked={emergencyClicked}
        onEmergencyClick={onEmergencyClick}
        onAboutUsClicked={() => setEmergencyClicked(false)}
      ></NavigationBar>
      <Route path="/">
        <HomePage location={location}></HomePage>
      </Route>
      <Route path="/aboutus">
        <AboutUs></AboutUs>
      </Route>
      {isTopButtonVisible && (
        <div className="scroll-top">
          <ArrowCircleUpIcon
            className="arrow circle up icon"
            onClick={() => topElementRef.current.scrollIntoView()}
          />
        </div>
      )}
    </div>
  );
};

export default App;
