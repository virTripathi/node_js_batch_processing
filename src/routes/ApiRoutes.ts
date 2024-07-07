import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello from routes!' });
});

router.get('/v1/file-upload', (req, res) => {
    res.json({ message: 'File upload API' });
});

// Add more routes as needed

export default router;
