const express = require('express');
const router = express.Router();
const { insertStaticData, getAllProjects } = require('../controllers/projectController');

router.post('/insert-static-data', insertStaticData);
router.get('/projects', getAllProjects);

module.exports = router;
