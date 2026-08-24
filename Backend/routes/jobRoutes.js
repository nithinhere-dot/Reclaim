const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Role matters here — only posters should create jobs
router.post('/', auth, role('poster'), jobController.createJob);

// Public — anyone can browse open jobs
router.get('/', jobController.getJobs);

// Role matters here — only collectors should accept/complete
router.put('/:id/accept', auth, role('collector'), jobController.acceptJob);
router.put('/:id/complete', auth, role('collector'), jobController.completeJob);

// No role needed — the query filters by the logged-in user automatically
router.get('/my-jobs', auth, jobController.getMyJobs);
router.get('/my-accepted', auth, jobController.getMyAcceptedJobs);

// Only posters can cancel/delete their own jobs
router.put('/:id/cancel', auth, role('poster'), jobController.cancelJob);
router.delete('/:id', auth, role('poster'), jobController.deleteJob);

module.exports = router;
