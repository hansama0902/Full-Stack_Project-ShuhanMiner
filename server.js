import dotenv from 'dotenv';
import debugLib from 'debug';
import app from './app.js';

dotenv.config();
const debug = debugLib('shuhanminers:server');

const PORT = process.env.PORT || 3000;

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    debug(`Listening on port ${PORT}`);
  });
}

export default app;
