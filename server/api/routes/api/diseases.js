const express = require('express');
const router = express.Router();
const DiseasesService = require('../../services/diseases');

router.get('/', DiseasesService.getDiseases);
router.post('/', DiseasesService.createDisease);
router.get('/:diseaseId', DiseasesService.getDisease);
router.put('/:diseaseId', DiseasesService.updateDisease);
router.delete('/:diseaseId', DiseasesService.deleteDisease);

module.exports = router;