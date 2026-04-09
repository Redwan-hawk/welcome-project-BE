const activityModel = require('../models/activityModel');

exports.getActivityByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const activity = await activityModel.getActivityByUserId(userId);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.status(200).json(activity);
    } catch (err) {
        console.error('Error fetching activity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] GET /api/activities/${req.params.userId} - Completed`);
    }   
};

exports.logActivity = async (req, res) => {
    try {
        const { userId, activityType } = req.body;
        const newActivity = await activityModel.logActivity(userId, activityType);
        res.status(201).json(newActivity);
    } catch (err) {
        console.error('Error logging activity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        console.log(`[${new Date().toISOString()}] POST /api/activities - Completed`);
    }   
};
