import { useEffect, useState } from "react";

const useLocation = (defaultLoc, emergencyClicked) => {
  const [location, setLocation] = useState("");

  const retrieveLocation = (loc) => {
    setLocation(`${loc.coords.latitude}, ${loc.coords.longitude}`);
  };

  const getLocation = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  useEffect(() => {
    let isMount = true;
    if (!emergencyClicked) {
      if (navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (isMount) {
            if (result.state === "granted") {
              getLocation().then((loc) => {
                retrieveLocation(loc);
              });
            } else if (result.state === "prompt") {
            } else if (result.state === "denied") {
              setLocation(defaultLoc);
              //If denied then you have to show instructions to enable location
              navigator.permissions.revoke({ name: "geolocation" });
            }
            result.onchange = () => {
              // console.log(result.state);
            };
          }
        });
      } else {
        alert("Sorry Not available!");
      }
    }
    return () => (isMount = false);
  }, [location]);

  return [location, setLocation];
};

export default useLocation;
