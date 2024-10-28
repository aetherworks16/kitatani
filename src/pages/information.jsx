import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Information = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://kitatani-api.kakashispiritnews.my.id/area-angling"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        const feature = result.features.find(
          (feature) => feature.properties.entityhandle === name
        );
        setData(feature);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data found for entityhandle: {name}</div>;
  }

  return (
    <div>
      <h1>Information for Entity Handle: {data.properties.entityhandle}</h1>
      <p>Coordinates: {data.geometry.coordinates.join(", ")}</p>
      <p>OGC FID: {data.properties.ogc_fid}</p>
      <p>Layer: {data.properties.layer}</p>
    </div>
  );
};

export default Information;
