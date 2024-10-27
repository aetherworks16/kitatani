from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from models import FeatureModel
from utils import geometry_hex_parse, convert_utm_to_wgs84

app = FastAPI()

from connector import Connector

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connector = Connector()

@app.get("/area-angling", response_model=dict)
def get_entities():
    query = 'SELECT * FROM area_angling'
    result = connector.query(query)

    features = [
        FeatureModel(
            type="Feature",
            geometry=geometry_hex_parse(row[7]),
            properties={
                "ogc_fid": row[0],
                "layer": row[1],
                "paperspace": row[2],
                "subclasses": {
                    "type": row[3].split(':')[0] if row[3] else None,
                    "subtype": row[3].split(':')[1] if ':' in row[3] else None
                },
                "linetype": row[4],
                "entityhandle": row[5],
                "text": row[6]
            }
        ) for row in result
    ]

    for feature in features:
        feature.geometry.coordinates = convert_utm_to_wgs84(feature.geometry.coordinates)

    geojson_response = {
        "type": "FeatureCollection",
        "features": features
    }

    return geojson_response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
