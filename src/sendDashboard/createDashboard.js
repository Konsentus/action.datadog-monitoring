const core = require('@actions/core');
const axios = require('axios');

/**
 * Creates a dashboard with a given JSON body
 *
 * @param {Object} config - axios configuration
 * @param {Object} body - Dashboard body payload
 */
const createDashboard = async (config, body) => {
  try {
    await axios({
      ...config,
      data: body,
      method: 'post',
      url: '/dashboard',
    });
  } catch (err) {
    core.info(
      JSON.stringify({
        ...config,
        data: body,
        method: 'post',
        url: '/dashboard',
      }),
    );
    core.setFailed(`createDashboard: Action failed with error ${err}`);

    Error(`createDashboard: Action failed with error ${err}`);
  }
};

module.exports = { createDashboard };
