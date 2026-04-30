import express from 'express';
import Email from '../models/Email';

const router = express.Router();

// GET all processed emails for a user
router.get('/', async (req, res) => {
  try {
    // In production, get userId from req.user (after auth middleware)
    // const userId = req.user._id;
    
    // For demo purposes, we fetch all or require a user ID in query
    const emails = await Email.find().sort({ dateReceived: -1 });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET emails by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const emails = await Email.find({ category }).sort({ dateReceived: -1 });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET upcoming deadlines
router.get('/deadlines', async (req, res) => {
  try {
    const today = new Date();
    const emails = await Email.find({
      'extractedData.deadline': { $gte: today }
    }).sort({ 'extractedData.deadline': 1 });
    
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
