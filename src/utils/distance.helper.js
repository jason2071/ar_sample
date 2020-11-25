const DISTANCE_MIN = 2;
const DISTANCE_MAX = 5;

export function getScale(distance, min, max) {
  const scaleRatio =
    ((DISTANCE_MAX - DISTANCE_MIN) * (distance - min)) / (max - min) +
    DISTANCE_MIN;
  return distance / scaleRatio;
}

export function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // in metres
  return d;
}

function latLongToMerc(lat_deg, lon_deg) {
  var lon_rad = (lon_deg / 180.0) * Math.PI;
  var lat_rad = (lat_deg / 180.0) * Math.PI;
  var sm_a = 637813.7;
  var xmeters = sm_a * lon_rad;
  var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad));
  return {x: xmeters, y: ymeters};
}

export function transformPointToAR(target_lat, target_lng, my_lat, my_lng) {
  const targetPoint = latLongToMerc(target_lat, target_lng);
  const devicePoint = latLongToMerc(my_lat, my_lng);

  const objDeltaY = targetPoint.y - devicePoint.y;
  const objDeltaX = targetPoint.x - devicePoint.x;

  return {x: objDeltaX, y: 0, z: -objDeltaY};
}
