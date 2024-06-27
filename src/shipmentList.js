const Shipment = require('./wrapper/shipment');
const ShipmentService = require('./shipmentService');

function getShipmentsList(packageList, maxCarriableCapacity) {
  try {
    const shipment = new Shipment(packageList, maxCarriableCapacity);
    const shipmentService = new ShipmentService(shipment);
    return shipmentService.getPossibleShipments();
  } catch (error) {
    return error.message;
  }
}

module.exports = getShipmentsList;
