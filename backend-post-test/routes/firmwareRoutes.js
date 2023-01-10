const express = require('express')

const { getFirmware, addFirmware } = require('../db/dbFirmware')

const router = express.Router()

//GET /api/v1/firmware
router.get('/', (req, res) => {
    return getFirmware()
      .then((firmware) => {
        res.json(firmware)
      })
      .catch(() => res.status(500).json({ message: 'Something went wrong' }))
  })

router.post('/', (req, res) => {
    const { createdDate, firmwareVersion, deviceType, status, description, vendorMetadata, firmwareFile } = req.body
    addFirmware({ createdDate, firmwareVersion, deviceType, status, description, vendorMetadata, firmwareFile })
        .then(() => {
            res.sendStatus(204)
        })
        .catch((err) => {
            console.error(err.message)
            res.status(500).json({ message: 'Something went wrong' })
        })
})

module.exports = router