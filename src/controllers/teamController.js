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

const addTeamMember = async (req, res) => {

  try {
    const newTeamMember = new TeamMember(req.body);

    await newTeamMember.save();
    res.status(201).json(newTeamMember);
	logger.info('Added new team member successfuly:',JSON.stringify(newTeamMember));
  } catch (error) {
	logger.error(`Error while adding team member: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const editTeamMember = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTeamMember = await TeamMember.findOneAndUpdate({id:id}, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeamMember) {
	  logger.error(`Team member ${id} not found`);
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(201).json(updatedTeamMember);
	logger.info('Updated team member successfuly:',JSON.stringify(updatedTeamMember));
  } catch (error) {
	logger.error(`Error while updating team member ${id}: ${error.message}`);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteTeamMember = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeamMember = await TeamMember.findOneAndDelete({id:id});

    if (!deletedTeamMember) {
	  logger.error(`Team member ${id} not found`);
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(204).send();
	logger.info(`Deleted team member ${id} successfuly`);
  } catch (error) {
	logger.error(`Error while deleting team member ${id}: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeamMember,
  getAllTeamMembers,
  addTeamMember,
  editTeamMember,
  deleteTeamMember,
};
