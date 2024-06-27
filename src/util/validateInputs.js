function validateInputs(inputs) {
  const { noOfPackages, packageList, maxSpeed, noOfVehicles, maxCarriableCapacity } = inputs;
  
  if (!noOfPackages || !packageList || !maxSpeed || !noOfVehicles || !maxCarriableCapacity) {
    throw new Error('Please enter all the elements in the input array for the given length');
  }

  if (!Array.isArray(packageList) || packageList.length === 0) {
    throw new Error('Package list must be a non-empty array');
  }
}

module.exports = validateInputs;
