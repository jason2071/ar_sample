export function vehicleBearing(end, start) {
  let x1 = end.lat;
  let y1 = end.lng;
  let x2 = start.lat;
  let y2 = start.lng;

  let radians = getAtan2(y1 - y2, x1 - x2);

  function getAtan2(y, x) {
    return Math.atan2(y, x);
  }

  let compassReading = radians * (180 / Math.PI);

  let coordNames = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  let coordIndex = Math.round(compassReading / 45);
  if (coordIndex < 0) {
    coordIndex = coordIndex + 8;
  }

  return {
    compassString: coordNames[coordIndex],
    compassReading: compassReading < 0 ? compassReading + 360 : compassReading,
  };
}
