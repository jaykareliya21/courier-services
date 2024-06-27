class ShipmentService {
  constructor(shipment) {
    this.shipment = shipment;
  }

  getPossibleShipments() {
    const { packageList, maxCarriableCapacity } = this.shipment;
    let possiblePackages = [];
    let localHighestSum = 0;
    const possiblePackagesIndices = [];

    for (let i = 1; i < 1 << packageList.length; i++) {
      const weightedSubset = {};
      const subset = [];

      for (let j = 0; j < packageList.length; j++) {
        if (i & (1 << j)) subset.push(packageList[j]);
      }

      weightedSubset.subset = subset;

      let temp = 0;
      subset.forEach(element => (temp += element.weight));
      weightedSubset.integratedSum = temp;

      if (temp <= maxCarriableCapacity && temp >= localHighestSum) {
        localHighestSum = temp;
        possiblePackages.push(weightedSubset);
      }
    }

    possiblePackages = possiblePackages.filter(
      element => element.integratedSum === localHighestSum
    );

    possiblePackages.forEach(element => {
      let temp = [];
      element.subset.forEach(ele => temp.push(ele.index));
      possiblePackagesIndices.push(temp);
    });

    return possiblePackagesIndices;
  }
}

module.exports = ShipmentService;
