const express = require('express');
const router = express.Router();
const { verifyToken } = require('./auth');

// Mock shift data (const for immutability)
const shifts = [
  { id: 1, date: '2024-10-20', time: '09:00-12:00', location: 'Sihlcity', task: 'Cinemasupport', appliedUsers: [], assignedUsers: [] },
  { id: 2, date: '2024-10-21', time: '14:00-18:00', location: 'Frauenbadi', task: 'Bar', appliedUsers: [], assignedUsers: [] },
  { id: 3, date: '2024-10-22', time: '08:00-11:00', location: 'Festivalcentre', task: 'Information Desk', appliedUsers: [], assignedUsers: [] },
];

// Route to get all available shifts (protected route)
router.get('/', verifyToken, (req, res) => {
  res.json(shifts);
});

// Apply for a shift (protected route)
router.post('/apply', verifyToken, (req, res) => {
  const { shiftId } = req.body;
  const shift = shifts.find(s => s.id === shiftId);

  if (!shift) {
    return res.status(404).json({ message: 'Shift not found' });
  }

  // Check if the user has already applied for this shift
  if (shift.appliedUsers.includes(req.user.userId)) {
    return res.status(400).json({ message: 'You have already applied for this shift.' });
  }

  // Add the user to the applied users list
  shift.appliedUsers.push(req.user.userId);
  res.status(200).json({ message: 'Shift application successful.' });
});

// Route to get assigned shifts for the logged-in user
router.get('/assigned', verifyToken, (req, res) => {
  const userId = req.user.userId;
  const assignedShifts = shifts.filter(shift => shift.assignedUsers.includes(userId));
  res.json(assignedShifts);
});

module.exports = router;
