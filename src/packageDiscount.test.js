const { expect } = require('@jest/globals');
const getPackageDiscount = require('./packageDiscount');

describe('verify getPackageDiscount function', () => {
  describe('Invalid arguments, passes', () => {
    test('No package details', () => {
      expect(getPackageDiscount({})).toEqual('Please enter all the valid parameters');
    });

    test('Invalid package details', () => {
      expect(
        getPackageDiscount({
          pkgId: 'PKG1',
          pkgWeightInKg: 3,
          distanceInKm: 'any input',
          basePrice: 100,
          offerCode: 'OFR001',
        })
      ).toEqual('Invalid number value');
    });

    test('Invalid offer code', () => {
      expect(
        getPackageDiscount({
          pkgId: 'PKG1',
          pkgWeightInKg: 3,
          distanceInKm: 5,
          basePrice: 100,
          offerCode: 'OFR01',
        })
      ).toEqual({ price: 155, discount: 0, pkgId: 'PKG1' });
    });

    test('Two invalid offer codes', () => {
      expect(
        getPackageDiscount({
          pkgId: 'PKG1',
          pkgWeightInKg: 3,
          distanceInKm: 5,
          basePrice: 100,
          offerCode: 'invalidOfferCode1, invalidOfferCode2',
        })
      ).toEqual({ price: 155, discount: 0, pkgId: 'PKG1' });
    });
  });

  describe('Valid arguments, passes', () => {
    test('No offer code', () => {
      expect(
        getPackageDiscount({
          pkgId: 'PKG1',
          pkgWeightInKg: 5,
          distanceInKm: 5,
          basePrice: 100,
        })
      ).toEqual({ price: 175, discount: 0, pkgId: 'PKG1' });
    });

    test('Valid offer code', () => {
      expect(
        getPackageDiscount({
          pkgId: 'PKG1',
          pkgWeightInKg: 15,
          distanceInKm: 5,
          basePrice: 100,
        })
      ).toEqual({ price: 275, discount: 0, pkgId: 'PKG1' });
    });

    test('Valid offer code', () => {
      expect(
        getPackageDiscount({
          pkgId: 'PKG1',
          pkgWeightInKg: 155,
          distanceInKm: 50,
          offerCode: 'OFR002',
          basePrice: 100,
        })
      ).toEqual({ price: 1767, discount: 133, pkgId: 'PKG1' });
    });

    test('Two or more valid offer codes', () => {
      expect(
        getPackageDiscount({
          pkgId: 'PKG1',
          pkgWeightInKg: 155,
          distanceInKm: 50,
          offerCode: 'OFR002 OFR003',
          basePrice: 100,
        })
      ).toEqual({ price: 1767, discount: 133, pkgId: 'PKG1' });
    });
  });
});

