const core = require('@actions/core');
const axios = require('axios');

/**
 * Updates a dashboard with given id and JSON body
 *
 * @param {string} id - The ID of the dashboard, set by Datadog.
 * @param {Object} config - axios configuration
 * @param {Object} body - Dashboard body payload
 */
const updateDashboard = async (id, config, body) => {
  try {
    await axios({
      ...config,
      data: body,
      method: 'put',
      url: `/dashboard/${id}`,
    });
  } catch (err) {
    core.setFailed(`updateDashboard: Action failed with error ${err}`);
  }
};

module.exports = { updateDashboard };
