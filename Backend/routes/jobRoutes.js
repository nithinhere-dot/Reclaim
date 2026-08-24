const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.post('/', auth, jobController.createJob);

router.get('/',jobController.getJobs);

router.put('/:id/accept', auth, jobController.acceptJob);

module.exports = router;
