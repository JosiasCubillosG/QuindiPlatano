const express = require('express');
const router = express.Router();
const CropsService = require('../../services/crops');

router.get('/', CropsService.getCrops);
router.post('/', CropsService.createCrop);
router.get('/:cropId', CropsService.getCrop);
router.put('/:cropId', CropsService.updateCrop);
router.delete('/:cropId', CropsService.deleteCrop);

module.exports = router;