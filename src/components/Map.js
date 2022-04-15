import React from "react";

const Map = ({ location }) => {
  return (
    <div id="map">
      <iframe
        width="100%"
        height="450px"
        style={{ border: "1px solid #c2c2c2" }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCXKKme3jzfk4W1voYj23_SUZOnqDHWoeo
  &q=${location}`}
        title="Google Maps"
      ></iframe>
    </div>
  );
};

export default Map;
