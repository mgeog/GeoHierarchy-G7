import {
  geoAlbers,
  geoConicConformal,
  geoMercator,
  geoPath,
  GeoProjection,
} from 'd3-geo';
import { CountryAdministrativeData } from '../types/geo';

export interface ProjectedSubDivision {
  id: string;
  pathD: string;
  centroidPx: [number, number];
}

export function createCountryProjection(
  country: CountryAdministrativeData,
  width: number,
  height: number
): GeoProjection {
  let projection: GeoProjection;
  const cfg = country.projectionConfig;

  if (cfg.type === 'albers') {
    projection = geoAlbers()
      .rotate([-country.center[0], 0])
      .center([0, country.center[1]])
      .parallels(cfg.parallels || [29.5, 45.5]);
  } else if (cfg.type === 'conicConformal') {
    projection = geoConicConformal()
      .rotate([-country.center[0], 0])
      .center([0, country.center[1]])
      .parallels(cfg.parallels || [30, 42]);
  } else {
    projection = geoMercator()
      .center(country.center);
  }

  // Base scale normalized to viewport size (800x600 reference)
  const baseScale = (Math.min(width, height) / 600) * cfg.scaleMultiplier;
  projection
    .scale(baseScale)
    .translate([width / 2, height / 2]);

  return projection;
}

export function projectCoordinates(
  projection: GeoProjection,
  coordinates: [number, number]
): [number, number] | null {
  const projected = projection(coordinates);
  if (!projected || isNaN(projected[0]) || isNaN(projected[1])) {
    return null;
  }
  return [projected[0], projected[1]];
}

export function projectPolygon(
  projection: GeoProjection,
  polygon: number[][][]
): string {
  const pathGenerator = geoPath().projection(projection);
  const geoJsonPolygon = {
    type: 'Polygon' as const,
    coordinates: polygon,
  };
  return pathGenerator(geoJsonPolygon) || '';
}
