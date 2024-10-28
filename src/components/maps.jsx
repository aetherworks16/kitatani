import { useRef, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";

const Maps = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const navigate = useNavigate();

  const [toggleSideBar, settoggleSideBar] = useState(false);
  const sideBar = useRef(null);
  const [nameLocation, setNameLocation] = useState(""); // State untuk nama lokasi

  const lng = 107.70615221580547;
  const lat = -6.824409580624;
  const zoom = 15;
  const API_KEY = "eX2wDavS7RwXiaU08uav";
  const dataMapUrl = "http://kitatani-api.kakashispiritnews.my.id/area-angling";

  useLayoutEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.dragRotate.disable();
    map.current.keyboard.disable();
    map.current.touchZoomRotate.disableRotation();

    map.current.on("load", async () => {
      const response = await fetch(dataMapUrl);
      const dataMap = await response.json();

      map.current.addSource("maps", {
        type: "geojson",
        data: dataMap,
      });

      map.current.addLayer({
        id: "maps",
        type: "line",
        source: "maps",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });

      dataMap.features.forEach((feature) => {
        if (
          feature.geometry.type === "Point" &&
          feature.properties.entityhandle
        ) {
          const coordinates = feature.geometry.coordinates;
          const name = feature.properties.entityhandle;

          const el = document.createElement("div");
          el.className = "marker";

          const popup = new maplibregl.Popup({ offset: 25 })
            .setText(`Info: ${name}`)
            .on("open", () => {
              settoggleSideBar(true);
              setNameLocation(name);
            })
            .on("close", () => {
              settoggleSideBar(false);
              setNameLocation("");
            });

          new maplibregl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map.current);
        }
      });
    });
  }, [dataMapUrl, lng, lat, zoom, API_KEY]);

  return (
    <div className="container">
      <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />
      <div
        ref={sideBar}
        className={`sideBar-content ${toggleSideBar ? "active" : ""}`}
      >
        <h2>{nameLocation}</h2>
        <h1>Explore More About This Location!</h1>
        <p>
          Discover exciting information and activities at {nameLocation}. Click
          below to learn more!
        </p>
        <button onClick={() => navigate(`/information/${nameLocation}`)}>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Maps;
