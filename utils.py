import binascii

from pyproj import transform
from shapely import wkb

from definitions import UTM_48S_PROJ, WGS84_PROJ
from models import GeometryModel


def geometry_hex_parse(hex_string: str) -> GeometryModel:
    binary_data = binascii.unhexlify(hex_string)
    geometry = wkb.loads(binary_data)

    geometry_type = geometry.geom_type

    if geometry_type == "Point":
        coordinates = geometry.coords[0]
    elif geometry_type in ["LineString", "MultiPoint"]:
        coordinates = list(geometry.coords)
    elif geometry_type in ["Polygon", "MultiPolygon"]:
        coordinates = [list(geom.exterior.coords) for geom in geometry.geoms] if geometry_type == "MultiPolygon" else [list(geometry.exterior.coords)]
    else:
        coordinates = []

    return GeometryModel(type=geometry_type, coordinates=coordinates)

def convert_utm_to_wgs84(coordinates):
    if isinstance(coordinates[0], (list, tuple)):
        return [convert_utm_to_wgs84(coord) for coord in coordinates]
    else:
        utm_x, utm_y = coordinates
        longitude, latitude = transform(UTM_48S_PROJ, WGS84_PROJ, utm_x, utm_y)
        return (latitude, longitude)