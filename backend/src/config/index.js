import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default {
  githubToken: process.env.GITHUB_TOKEN,
  githubUsername: process.env.GITHUB_USERNAME,
  leetcodeUsername: process.env.LEETCODE_USERNAME,
  codechefUsername: process.env.CODECHEF_USERNAME,
  gfgUsername: process.env.GFG_USERNAME,
  port: process.env.PORT || 4000,
  cacheTtlMinutes: parseInt(process.env.CACHE_TTL_MINUTES || '30', 10)
};
