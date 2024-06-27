const { expect } = require('@jest/globals');
const getShipmentsList = require('./shipmentList');

describe('verify getShipmentsList function', () => {
  describe('Invalid arguments', () => {
    test('No input array or no individual values', () => {
      expect(getShipmentsList([], 200)).toEqual('Invalid Inputs');
    });
    
    test('Empty package list', () => {
      expect(getShipmentsList([], 200)).toEqual('Invalid Inputs');
    });

    test('Negative total weight', () => {
      expect(getShipmentsList([{ weight: 100, index: 0 }], -100)).toEqual('Invalid Inputs');
    });
  });

  describe('Valid arguments', () => {
    test('Valid input array', () => {
      expect(
        getShipmentsList(
          [
            { weight: 100, index: 0 },
            { weight: 75, index: 1 },
            { weight: 175, index: 2 },
            { weight: 1, index: 3 },
            { weight: 155, index: 4 },
          ],
          200
        )
      ).toEqual([
        [0, 1, 3],
        [2, 3],
      ]);
    });

    test('Valid input array', () => {
      expect(
        getShipmentsList(
          [
            { weight: 50, index: 0 },
            { weight: 75, index: 1 },
            { weight: 175, index: 2 },
            { weight: 110, index: 3 },
            { weight: 155, index: 4 },
          ],
          200
        )
      ).toEqual([[1, 3]]);
    });

    test('Valid input array', () => {
      expect(
        getShipmentsList(
          [
            { weight: 50, index: 0 },
            { weight: 60, index: 1 },
            { weight: 175, index: 2 },
            { weight: 110, index: 3 },
            { weight: 155, index: 4 },
          ],
          200
        )
      ).toEqual([[2]]);
    });
  });
});
