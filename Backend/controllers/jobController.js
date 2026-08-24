const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { wasteType, description, location } = req.body;

    if (!wasteType || !description || !location) {
      return res.status(400).json({ message: 'wasteType, description, and location are required' });
    }

    const job = await Job.create({
      wasteType,
      description,
      location,
      postedBy: req.user.id,
    });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
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


exports.completeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.status !== 'accepted') {
      return res.status(400).json({ message: 'Job must be accepted before completing' });
    }

    if (job.acceptedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the collector who accepted this job can complete it' });
    }

    job.status = 'completed';
    await job.save();

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyAcceptedJobs = async (req, res) => {
  try{
    const jobs = await Job.find({acceptedBy:req.user.id});
    res.json(jobs);
  }catch(error)
  {
    res.status(500).json({message:'Server error',error:error.message})
  }
}

exports.cancelJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the poster can cancel this job' });
    }

    if (job.status !== 'open') {
      return res.status(400).json({ message: 'Can only cancel open jobs' });
    }

    job.status = 'cancelled';
    await job.save();

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the poster can delete this job' });
    }

    if (job.status === 'accepted') {
      return res.status(400).json({ message: 'Cannot delete a job that has been accepted' });
    }

    await job.deleteOne();

    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
