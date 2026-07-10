import express from 'express';
import ProfileController from '../controllers/profile.controller.js';
import cacheMiddleware from '../middleware/cache.middleware.js';

const router = express.Router();

router.get('/profile', cacheMiddleware((req) => `profile_all:${req.query.username||req.query.url||'default'}`), ProfileController.getProfile);
router.get('/github', cacheMiddleware((req) => `github:${req.query.username||req.query.url||'default'}`), ProfileController.getGithub);
router.get('/leetcode', cacheMiddleware((req) => `leetcode:${req.query.username||req.query.url||'default'}`), ProfileController.getLeetCode);
router.get('/codechef', cacheMiddleware((req) => `codechef:${req.query.username||req.query.url||'default'}`), ProfileController.getCodeChef);
router.get('/gfg', cacheMiddleware((req) => `gfg:${req.query.username||req.query.url||'default'}`), ProfileController.getGFG);
router.get('/heatmaps', cacheMiddleware((req) => `heatmaps:${req.query.username||req.query.url||'default'}`), ProfileController.getHeatmaps);
router.get('/activity', cacheMiddleware((req) => `activity:${req.query.username||req.query.url||'default'}`), ProfileController.getActivity);

export default router;
