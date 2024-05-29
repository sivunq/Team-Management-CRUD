const TeamMember = require('../models/teamModel');
const logger = require('../logger/logger');

const getTeamMember = async (req, res) => {
  const { id } = req.params;

  try {
    const teamMember = await TeamMember.findOne({id:id});

    if (!teamMember) {
      return res.status(404).json({ message: `Team member ${id} not found` });
    }

    res.status(200).json(teamMember);
	logger.info(`Got team member ${id} successfuly`);
  } catch (error) {
	logger.error(`Error getting team members ${id}: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const getAllTeamMembers = async (req, res) => {
	try{
		const { page = 1, limit = 10 } = req.query;
		const pageNumber = parseInt(page);
		const limitNumber = parseInt(limit);

		const totalDocuments = await TeamMember.countDocuments().exec();
		const totalPages = Math.ceil(totalDocuments / limitNumber);
		const startIndex = (pageNumber - 1) * limitNumber;

		const results = {
		  totalPages,
		  currentPage: pageNumber
		};

		if (pageNumber > 1) results.previousPage = pageNumber - 1;
		if (pageNumber < totalPages) results.nextPage = pageNumber + 1;

		results.results = await TeamMember.find()
		  .skip(startIndex)
		  .limit(limitNumber)
		  .exec();

		res.status(200).json(results);
		logger.info('Got all team members successful');    
  } catch (error) {
	logger.error(`Error getting team members: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

const addTeamMember = async (req, res) => {};

const editTeamMember = async (req, res) => {};

const deleteTeamMember = async (req, res) => {};

module.exports = {
  getTeamMember,
  getAllTeamMembers,
  addTeamMember,
  editTeamMember,
  deleteTeamMember,
};
