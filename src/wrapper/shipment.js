class Shipment {
  constructor(packageList, maxCarriableCapacity) {
    this.packageList = packageList;
    this.maxCarriableCapacity = this.validateNumber(maxCarriableCapacity);

    if (!Array.isArray(packageList) || packageList.length === 0 || maxCarriableCapacity < 0) {
      throw new Error('Invalid Inputs');
    }
  }

  validateNumber(value) {
    const number = parseInt(value, 10);
    if (isNaN(number)) {
      throw new Error('Invalid number value');
    }
    return number;
  }
}

module.exports = Shipment;
