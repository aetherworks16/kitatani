from pydantic import BaseModel
from typing import List, Optional, Tuple, Union

class GeometryModel(BaseModel):
    type: str
    coordinates: Union[Tuple[float, float], List[Tuple[float, float]], List[List[Tuple[float, float]]]]

class FeatureModel(BaseModel):
    type: str
    geometry: GeometryModel
    properties: dict

class SpatialDataModel(BaseModel):
    ogc_fid: Optional[int]
    layer: Optional[str]
    paperspace: Optional[bool]
    subclasses: Optional[str]
    linetype: Optional[str]
    entityhandle: Optional[str]
    text: Optional[str]