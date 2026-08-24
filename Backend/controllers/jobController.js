const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  const { wasteType, description, location } = req.body;

  const job = await Job.create({
    wasteType,
    description,
    location,
    postedBy: req.user.id,
  });

  res.json(job);
};


exports.getJobs = async (req, res) => {
const jobs = await Job.find({status:'open'});

  res.json(jobs);
};


exports.acceptJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.status !== 'open') {
      return res.status(400).json({ message: 'Job is already accepted or completed' });
    }

    job.status = 'accepted';
    job.acceptedBy = req.user.id;
    await job.save();

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

