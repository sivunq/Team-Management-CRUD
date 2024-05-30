const TeamMember = require('../models/teamModel');
const logger = require('../logger/logger');

const getTeamMember = async (req, res, next) => {
  const { id } = req.params;

  try {
    const teamMember = await TeamMember.findOne({id:id});

    if (!teamMember) {
	  res.sendError({ message: `Team member ${id} not found`, statusCode: 404 });
      return;
    }

	res.sendResponse(teamMember);
	logger.info(`Got team member ${id} successfuly`);
  } catch (error) {
	res.sendError({ message: `Error getting team members ${id}: ${error.message}`, statusCode: 500 });
  }
};

const getAllTeamMembers = async (req, res, next) => {
	
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

		res.sendResponse(results);
		logger.info('Got all team members successful');    
  } catch (error) {
	res.sendError({ message: `Error getting team members: ${error.message}`, statusCode: 500 });
  }
};

const addTeamMember = async (req, res, next) => {

  try {
    const newTeamMember = new TeamMember(req.body);

    await newTeamMember.save();
	
    res.sendResponse(newTeamMember,201);
	logger.info('Added new team member successfuly:',JSON.stringify(newTeamMember));
  } catch (error) {	
	res.sendError({ message: `Error while adding team member: ${error.message}`, statusCode: 500 });
  }
};

const editTeamMember = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTeamMember = await TeamMember.findOneAndUpdate({id:id}, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeamMember) {
	  res.sendError({ message: `Team member ${id} not found`, statusCode: 404 });
      return;
    }

    res.sendResponse(updatedTeamMember,201);
	logger.info('Updated team member successfuly:',JSON.stringify(updatedTeamMember));
  } catch (error) {
    res.sendError({ message: `Error while updating team member ${id}: ${error.message}`, statusCode: 500 });
  }
};

const deleteTeamMember = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTeamMember = await TeamMember.findOneAndDelete({id:id});

    if (!deletedTeamMember) {
		res.sendError({ message: `Team member ${id} not found`, statusCode: 404 });
		return;
    }

    res.sendResponse({},204);
	logger.info(`Deleted team member ${id} successfuly`);
  } catch (error) {
	res.sendError({ message: `Error while deleting team member ${id}: ${error.message}`, statusCode: 500 });
  }
};

module.exports = {
  getTeamMember,
  getAllTeamMembers,
  addTeamMember,
  editTeamMember,
  deleteTeamMember,
};
