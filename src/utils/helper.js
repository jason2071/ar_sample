// TODO: Web mercator
export function createARObjectPosition(myLat, myLong, latObj, longObj) {
  const mobilePoint = latLongToMerc({lat: myLat, lng: myLong});
  const objPoint = latLongToMerc({lat: latObj, lng: longObj});

  const objDeltaY = objPoint.y - mobilePoint.y;
  const objDeltaX = objPoint.x - mobilePoint.x;

  const degree = 90;
  const angleRadian = (degree * Math.PI) / 180;

  const newObjX =
    objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
  const newObjY =
    objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);

  return {x: newObjX, y: 0, z: -newObjY};
}

function latLongToMerc({lat, lng}) {
  const longRad = (lng / 180.0) * Math.PI;
  const latRad = (lat / 180.0) * Math.PI;
  const smA = 6378137.0;
  const xmeters = smA * longRad;
  const ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));
  return {x: xmeters, y: ymeters};
}

// TODO: Distance
export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
