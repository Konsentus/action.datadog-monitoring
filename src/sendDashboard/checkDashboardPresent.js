const core = require('@actions/core');
const axios = require('axios');

/**
 * Verifies if a dashboard already exists, using name lookup.
 *
 * @param {string} title - The title of the dashboard.
 * @param {Object} config - axios configuration object
 * @returns {string|false} - Dashboards ID if exists, false otherwise.
 */
const checkDashboardPresent = async (title, config) => {
  try {
    const {
      data: { dashboards },
    } = await axios({
      ...config,
      url: '/dashboard?filtered=true',
      method: 'get',
    });

    const filteredDashboards = dashboards.filter(dashboard => dashboard.title === title);

    if (filteredDashboards.length === 1) {
      return filteredDashboards[0].id;
    }
    if (filteredDashboards.length > 1) {
      core.setFailed(
        `checkDashboardPresent returned too many values
      Monitors: ${JSON.stringify(filteredDashboards, null, 2)}`,
      );
      return Error('Check returned too many values');
    }
    return false;
  } catch (err) {
    core.setFailed(`checkDashboardPresent: Action failed with error ${err}`);
    return new Error(err);
  }
};

module.exports = { checkDashboardPresent };
