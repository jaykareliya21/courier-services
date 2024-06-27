const offerCodes = require('./data/offerCodes.json')
const isBetween = require('./util/isBetween');

class DiscountCalculator {
  constructor(packageDetails, costOfUnitDistance = 5, costOfUnitWeight = 10) {
    this.package = packageDetails;
    this.costOfUnitDistance = this.validateNumber(costOfUnitDistance);
    this.costOfUnitWeight = this.validateNumber(costOfUnitWeight);
  }

  validateNumber(value) {
    const number = parseInt(value);
    if (isNaN(number)) {
      throw new Error('Invalid number value');
    }
    return number;
  }

  calculatePrice() {
    return (
      this.package.basePrice +
      this.package.pkgWeightInKg * this.costOfUnitWeight +
      this.package.distanceInKm * this.costOfUnitDistance
    );
  }

  getOfferCode(offerCode) {
    if (!offerCode) return null;

    const codes = offerCode
      .toUpperCase()
      .split(/[ ,]+/)
      .filter(code => offerCodes.hasOwnProperty(code));

    return codes.length > 0 ? codes[0] : null;
  }

  calculateDiscount(offerCode) {
    const validOfferCode = this.getOfferCode(offerCode);
    if (!validOfferCode) return 0;

    const offer = offerCodes[validOfferCode];
    if (
      isBetween(this.package.distanceInKm, offer.distanceRange.min, offer.distanceRange.max) &&
      isBetween(this.package.pkgWeightInKg, offer.weightRange.min, offer.weightRange.max)
    ) {
      return (offer.discount / 100) * this.calculatePrice();
    }

    return 0;
  }

  getFinalPrice(offerCode) {
    const price = this.calculatePrice();
    const discount = this.calculateDiscount(offerCode);
    return { price: price - discount, discount, pkgId: this.package.pkgId };
  }
}

module.exports = DiscountCalculator;
