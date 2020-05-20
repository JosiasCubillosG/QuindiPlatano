const express = require('express');
const router = express.Router();
const LotService = require('../../services/lots');

router.get('/', LotService.getLots);
router.post('/', LotService.createLot);
router.get('/:lotId', LotService.getLot);
router.put('/:lotId', LotService.updateLot);
router.delete('/:lotId', LotService.deleteLot);

module.exports = router;