const connection = require('./connection')

function getFirmware(db = connection) {
  return db('firmware').select()
}

function addFirmware(firmware, db = connection) {
    return db('firmware').insert(firmware)
}

module.exports = { getFirmware, addFirmware }