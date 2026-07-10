import * as GithubService from '../services/github.service.js';
import * as LeetService from '../services/leetcode.service.js';
import * as CodeChefService from '../services/codechef.service.js';
import * as GFGService from '../services/gfg.service.js';
import AggregateService from '../services/aggregate.service.js';

const ProfileController = {
  async getGithub(req, res, next) {
    try {
      const identifier = req.query.url || req.query.username;
      const data = await GithubService.getGithubProfile(identifier);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getLeetCode(req, res, next) {
    try {
      const identifier = req.query.url || req.query.username;
      const data = await LeetService.getLeetCodeProfile(identifier);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getCodeChef(req, res, next) {
    try {
      const identifier = req.query.url || req.query.username;
      const data = await CodeChefService.getCodeChefProfile(identifier);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getGFG(req, res, next) {
    try {
      const identifier = req.query.url || req.query.username;
      const data = await GFGService.getGFGProfile(identifier);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  async getProfile(req, res, next) {
    try {
      const identifier = req.query.url || req.query.username;
      const github = await GithubService.getGithubProfile(identifier);
      const leet = await LeetService.getLeetCodeProfile(identifier);
      const codechef = await CodeChefService.getCodeChefProfile(identifier);
      const gfg = await GFGService.getGFGProfile(identifier);
      const aggregate = AggregateService.aggregateAll({ github, leet, codechef, gfg });
      res.json({ github, leet, codechef, gfg, aggregate });
    } catch (err) {
      next(err);
    }
  },

  async getHeatmaps(req, res, next) {
    try {
      const identifier = req.query.url || req.query.username;
      const github = await GithubService.getGithubHeatmap(identifier);
      const leet = await LeetService.getHeatmap(identifier);
      const codechef = await CodeChefService.getHeatmap(identifier);
      const gfg = await GFGService.getHeatmap(identifier);
      // merged separate from github
      const merged = AggregateService.mergeHeatmaps([leet, codechef, gfg]);
      res.json({ github, merged });
    } catch (err) {
      next(err);
    }
  },

  async getActivity(req, res, next) {
    try {
      const activities = await AggregateService.getActivityTimeline();
      res.json(activities);
    } catch (err) {
      next(err);
    }
  }
};

export default ProfileController;
