class Package {
  constructor({ pkgId, pkgWeightInKg, distanceInKm, basePrice }) {
    if (!pkgId || !pkgWeightInKg || !distanceInKm || !basePrice) {
      throw new Error('Please enter all the valid parameters');
    }

    this.pkgId = pkgId;
    this.pkgWeightInKg = this.validateNumber(pkgWeightInKg);
    this.distanceInKm = this.validateNumber(distanceInKm);
    this.basePrice = this.validateNumber(basePrice);
  }

  validateNumber(value) {
    const number = parseInt(value);
    if (isNaN(number)) {
      throw new Error('Invalid number value');
    }
    return number;
  }
}

module.exports = Package;
