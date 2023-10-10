import express from 'express';
import { getAllTeamC } from './controllers/teamController';

const router = express.Router()

router.get('/team', getAllTeamC);

export default router;