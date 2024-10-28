import { useEffect } from "react";

const Pointer = ({ map, id, source, color, radius }) => {
  useEffect(() => {
    if (!map.current) return;

    map.current.addLayer({
      id: `${id}-point`,
      type: "circle",
      source: source,
      filter: ["==", "$type", "Point"],
      paint: {
        "circle-color": `#${color}`, // Pastikan `color` dalam format hex string
        "circle-radius": radius,
      },
    });

    return () => {
      if (map.current.getLayer(`${id}-point`)) {
        map.current.removeLayer(`${id}-point`);
      }
      if (map.current.getSource(source)) {
        map.current.removeSource(source);
      }
    };
  }, [map, id, source, color, radius]);

  return null;
};

export default Pointer;
