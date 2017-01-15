const express = require('express')
const router = express.Router()

router.use(express.static(__dirname + '/react-app/build'))

module.exports = router;
