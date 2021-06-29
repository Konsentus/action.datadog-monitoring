const core = require('@actions/core');
const axios = require('axios');

/**
 * Verifies if a monitor already exists, using name lookup.
 *
 * @param {string} title - The title of the monitor.
 * @param {Object} config - axios configuration object
 * @returns {string|false} - Dashboards ID if exists, false otherwise.
 */
const checkMonitorPresent = async (title, config) => {
  try {
    const {
      data: { monitors },
    } = await axios({
      ...config,
      url: `/monitor/search?query=title:${title}`,
      method: 'get',
    });

    if (monitors && monitors.length === 1) {
      return monitors[0].id;
    }
    if (monitors.length > 1) {
      core.setFailed(
        `checkMonitorPresent returned too many values
        Monitors: ${JSON.stringify(monitors, null, 2)}`,
      );
      return Error('Check returned too many values');
    }
    return false;
  } catch (err) {
    core.setFailed(`checkMonitorPresent: Action failed with error ${err}`);
    return new Error();
  }
};

module.exports = { checkMonitorPresent };
