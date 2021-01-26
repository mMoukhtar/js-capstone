import express from 'express';
import path from 'path';

// Get access to dirname
const moduleURL = new URL(import.meta.url);
const dirname = path.dirname(moduleURL.pathname);

// Routers
const router = express.Router();

// End Points
router.get('/', (req, res) => {
    res.sendFile(path.join(dirname, '../../../dist/index.html'));
});

export default router;
