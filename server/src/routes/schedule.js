const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/ScheduleController')

router.put('/:id',  scheduleController.update);
router.delete('/:id', scheduleController.delete);
router.get('/:id', scheduleController.getById);
router.post('/', scheduleController.create);
router.get('/', scheduleController.getAll);

module.exports = router;