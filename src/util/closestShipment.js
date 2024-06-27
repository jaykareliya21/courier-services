function getClosestShipment(possibleShipmentList, packageList) {
  if (!possibleShipmentList || possibleShipmentList.length === 0) {
    return []; // Return an empty array if possibleShipmentList is invalid
  }

  if (possibleShipmentList.length === 1) return possibleShipmentList[0];

  const distanceList = possibleShipmentList.map(element => {
    return element.reduce((maxDistance, ele) => {
      return Math.max(maxDistance, packageList[ele].distance);
    }, 0);
  });

  const closestShipment = possibleShipmentList[distanceList.indexOf(Math.min(...distanceList))];
  return closestShipment || []; // Ensure it returns an array
}

module.exports = getClosestShipment;
