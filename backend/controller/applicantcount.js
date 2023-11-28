
const Application = require('../models/application');
const Company = require('../models/Company');

const applicantcount = async (req, res) => {
  try {
    const email = req.params.email;
    const page = parseInt(req.query.page) || 1;

    const adminJobs = await Company.find({ email: email });

    if (!adminJobs || adminJobs.length === 0) {
      return res.status(404).json({ error: 'Admin jobs not found' });
    }

    const jobIds = adminJobs.map((adminJob) => adminJob._id);

    // Define an array of status values you want to count
    const statusValues = ['accept', 'reject', 'review'];

    // Create an aggregation pipeline to group applications by status and calculate counts
    const pipeline = [
      {
        $match: {
          jobId: { $in: jobIds },
          status: { $in: statusValues }, // Filter by specified status values
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ];

    const applicationCounts = await Application.aggregate(pipeline);

    // Create a map to store counts for each status, initialized to zero
    const statusCountMap = new Map();
    statusValues.forEach((status) => {
      statusCountMap.set(status, 0);
    });

    // Update the map with counts from the aggregation result
    for (const applicationCount of applicationCounts) {
      statusCountMap.set(applicationCount._id, applicationCount.count);
    }

    // Convert the map to an array of objects
    const applicationDetails = [...statusCountMap.entries()].map(([status, count]) => ({
      status,
      count,
    }));

    // Calculate the total applied users
    const totalAppliedUsers = applicationDetails.reduce((total, item) => total + item.count, 0);

    res.json({
      data: applicationDetails,
      totalAppliedUsers,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

module.exports = {
  applicantcount,
};

  