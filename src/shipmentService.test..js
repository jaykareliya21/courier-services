const { expect } = require('@jest/globals');
const Shipment = require('../../src/models/Shipment');
const ShipmentService = require('../../src/services/ShipmentService');

describe('ShipmentService integration tests', () => {
  describe('getPossibleShipments method', () => {
    test('Valid input array', () => {
      const packageList = [
        { weight: 100, index: 0 },
        { weight: 75, index: 1 },
        { weight: 175, index: 2 },
        { weight: 1, index: 3 },
        { weight: 155, index: 4 },
      ];
      const maxCarriableCapacity = 200;
      const shipment = new Shipment(packageList, maxCarriableCapacity);
      const shipmentService = new ShipmentService(shipment);
      const result = shipmentService.getPossibleShipments();
      expect(result).toEqual([
        [0, 1, 3],
        [2, 3],
      ]);
    });

    test('Optimized for number of packages in a single delivery', () => {
      const packageList = [
        { weight: 50, index: 0 },
        { weight: 50, index: 1 },
        { weight: 150, index: 2 },
        { weight: 99, index: 3 },
        { weight: 100, index: 4 },
      ];
      const maxCarriableCapacity = 200;
      const shipment = new Shipment(packageList, maxCarriableCapacity);
      const shipmentService = new ShipmentService(shipment);
      const result = shipmentService.getPossibleShipments();
      expect(result).toEqual([
        [0, 1, 4]
      ]);
    });
  });
});
