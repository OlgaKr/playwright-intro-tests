const dotenv = require('dotenv');

function config() {
  if (process.env.TEST_ENV === 'qa') {
    dotenv.config({ path: 'config/.env.qa' });
  } else if (process.env.TEST_ENV === 'stage') {
    dotenv.config({ path: 'config/.env.stage' });
  } else {
    throw new Error('NO ENV');
  }
}

module.exports = { config };