const express = require('express');
const router = express.Router();
const majorController = require('../controllers/MajorController')

router.put('/:id',  majorController.update);
router.delete('/:id', majorController.delete);
router.get('/:id', majorController.getById);
router.post('/', majorController.create);
router.get('/', majorController.getAll);

module.exports = router;