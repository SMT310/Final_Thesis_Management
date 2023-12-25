const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController')

router.put('/:id/submit',  taskController.submitFile);
router.put('/:id',  taskController.update);
router.delete('/:id', taskController.delete);
router.get('/:id/theses', taskController.getByThesisId);
router.get('/:id', taskController.getById);
router.post('/', taskController.create);
router.get('/', taskController.getAll);

module.exports = router;