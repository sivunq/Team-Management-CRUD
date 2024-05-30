const express = require('express');
const {
  getTeamMember,
  getAllTeamMembers,
  addTeamMember,
  editTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');

const router = express.Router();

router.get('/members/:id', getTeamMember);
router.get('/members/', getAllTeamMembers);
router.post('/members/', addTeamMember);
router.put('/members/:id', editTeamMember);
router.delete('/members/:id', deleteTeamMember);

module.exports = router;
