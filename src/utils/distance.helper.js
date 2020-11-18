const DISTANCE_MIN = 2;
const DISTANCE_MAX = 5;

export function getScale(distance, min, max) {
  const scaleRatio =
    ((DISTANCE_MAX - DISTANCE_MIN) * (distance - min)) / (max - min) +
    DISTANCE_MIN;
  return distance / scaleRatio;
}

export function getDistance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    if (unit == 'M') {
      dist = dist * 1.609344 * 1000;
    }
    return dist;
  }
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

  const objFinalPosZ = targetPoint.y - devicePoint.y;
  const objFinalPosX = targetPoint.x - devicePoint.x;

  return {x: objFinalPosX, z: -objFinalPosZ};
}
