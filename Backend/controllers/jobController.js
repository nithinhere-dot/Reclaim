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
