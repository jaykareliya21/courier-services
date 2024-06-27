const getShipmentsList = require('./shipmentList');
const getClosestShipment = require('./util/closestShipment');
const packageDiscount = require('./packageDiscount');
const truncate = require('./util/truncate');
const validateInputs = require('./util/validateInputs');

class DeliveryService {
  constructor(config) {
    validateInputs(config);
    this.noOfPackages = config.noOfPackages;
    this.packageList = config.packageList;
    this.noOfVehicles = config.noOfVehicles;
    this.maxSpeed = config.maxSpeed;
    this.maxCarriableCapacity = config.maxCarriableCapacity;
    this.basePrice = config.basePrice;
    this.vehicleAvailabilityArray = Array(parseInt(config.noOfVehicles)).fill(0);
    this.packagesWithDuration = [];
  }

  calculateDeliveryTime() {
    let newUpdatedPackageList = [...this.packageList];

    while (newUpdatedPackageList.length > 0) {
      const possibleShipmentList = getShipmentsList(newUpdatedPackageList, this.maxCarriableCapacity);
      const nextDelivery = getClosestShipment(possibleShipmentList, this.packageList);
      const nextAvailableAt = Math.min(...this.vehicleAvailabilityArray);

      this.processDelivery(nextDelivery, nextAvailableAt);

      newUpdatedPackageList = newUpdatedPackageList.filter(element => element.duration === undefined);
    }

    return this.packagesWithDuration;
  }

  processDelivery(nextDelivery, nextAvailableAt) {
    let durationForSingleTrip = 0;

    nextDelivery.forEach(element => {
      const currentPackage = this.packageList[element];
      const deliveryTime = truncate(currentPackage.distance / this.maxSpeed);
      const packagePriceDiscount = packageDiscount({
        pkgId: currentPackage.pkgId,
        pkgWeightInKg: currentPackage.weight,
        distanceInKm: currentPackage.distance,
        basePrice: this.basePrice,
        offerCode: currentPackage.offerCode,
      });

      currentPackage.duration = truncate(nextAvailableAt + deliveryTime);

      this.packagesWithDuration.push({
        pkgId: currentPackage.pkgId,
        duration: currentPackage.duration,
        deliveryCost: truncate(packagePriceDiscount.price),
        discount: truncate(packagePriceDiscount.discount),
      });

      durationForSingleTrip = Math.max(deliveryTime, durationForSingleTrip);
    });

    this.vehicleAvailabilityArray[
      this.vehicleAvailabilityArray.indexOf(nextAvailableAt)
    ] = nextAvailableAt + 2 * durationForSingleTrip;
  }
}

module.exports = DeliveryService;

