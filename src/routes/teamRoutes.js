const express = require('express');
const {
  getTeamMember,
  getAllTeamMembers,
  addTeamMember,
  editTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');

const router = express.Router();

router.get('/:id', getTeamMember);
router.get('/', getAllTeamMembers);
router.post('/', addTeamMember);
router.put('/:id', editTeamMember);
router.delete('/:id', deleteTeamMember);

module.exports = router;
