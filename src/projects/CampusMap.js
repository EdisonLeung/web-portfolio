import {
  GoogleMap,
  useLoadScript,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { UW_LATITUDE_CENTER, UW_LONGITUDE_CENTER } from "./Constants";

import Select from "react-select";
import { initializeBuildingList, makeRequestRoute } from "./ServerRequests";

const CampusMap = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

const Body = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};


function Map() {
  const center = { lat: UW_LATITUDE_CENTER, lng: UW_LONGITUDE_CENTER };
  const [lines, setLines] = useState([]);

  const [buildings, setBuildings] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    initializeBuildingList(setBuildings);
  }, []);

  return (
    <div>
      <div id="map" className="map row">
        <div className="map column left"></div>
        <GoogleMap
          zoom={16}
          center={center}
          mapContainerClassName="map column middle"
        >
          {lines.map((line, index) => (
            <Polyline
              key={index}
              path={[line.startPoint, line.endPoint]}
              options={{
                strokeColor: "#ff2527",
                strokeOpacity: 0.75,
                strokeWeight: 2,
              }}
            />
          ))}
          {start !== "" && <Marker position={center}></Marker>}
          {end !== "" && <Marker position={center}></Marker>}
        </GoogleMap>

        <div className="map column right">
          <form onsubmit="event.preventDefault();" role="search">
            <Select
              id="search"
              placeholder="Search Start Building..."
              options={buildings.map((opt) => ({
                label: opt.longName + " - " + opt.shortName,
                value: opt.shortName,
              }))}
              onChange={(opt) => {
                setStart(opt.value);
                if (end !== "") makeRequestRoute(opt.value, end, setLines);
              }}
              required
            />
          </form>

          <form onsubmit="event.preventDefault();" role="search">
            <Select
              id="search"
              placeholder="Search Destination Building..."
              options={buildings.map((opt) => ({
                label: opt.longName + " - " + opt.shortName,
                value: opt.shortName,
              }))}
              onChange={(opt) => {
                setEnd(opt.value);
                if (start !== "") makeRequestRoute(start, opt.value, setLines);
              }}
              required
            />
          </form>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <React.Fragment>
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#" title="Hide navigation">
          Hide navigation
        </a>
        <ul id="nav" className="nav">
          <li>
            <a className="smoothscroll" href="/#home">
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="/#about">
              About
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="/#resume">
              Resume
            </a>
          </li>
          <li className="current">
            <a className="smoothscroll" href="/#portfolio">
              Projects
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="/#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};
export default CampusMap;
