const chalk = require('chalk')
const Table = require('cli-table3')
const rl = require('readline')
const figlet = require('figlet')
const inquire = require('./inquiry')

const getAllOfferCodes = require('./wrapper/getAllOfferCodes')
const getDeliveryDiscount = require('./wrapper/getDeliveryDiscount')
const getAllDeliveryTime = require('./wrapper/getDeliveryTime')
const putNewOfferCode = require('./wrapper/putNewOffer')
const getDeliveryTime = require('./wrapper/getDeliveryTime')

const runApp = async () => {
  const { typeOfFunctionality } = await inquire.askTypeFunction()

  switch (typeOfFunctionality) {
    case 'Calculate delivery cost':
      await getDeliveryDiscount()
      break
    case 'Calculate delivery time':
      await getDeliveryTime()
      break
    case 'Get all existing offercodes':
      await getAllOfferCodes()
      break
    case 'Calculate delivery time':
      await getAllDeliveryTime()
      break
    case 'Add new offercode':
      await putNewOfferCode()
      break

    case 'Exit':
      process.exit(0)

    default:
      break
  }
  runApp()
}

runApp()
