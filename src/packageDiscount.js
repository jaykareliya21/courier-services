const Package = require('./wrapper/package');
const DiscountCalculator = require('./discountCalculator');

function getPackageDiscount(packageDetails) {
  try {
    const packageData = new Package(packageDetails);
    const calculator = new DiscountCalculator(packageData, packageDetails.costOfUnitDistance, packageDetails.costOfUnitWeight);
    return calculator.getFinalPrice(packageDetails.offerCode);
  } catch (error) {
    return error.message;
  }
}

module.exports = getPackageDiscount;
