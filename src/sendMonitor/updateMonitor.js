const core = require('@actions/core');
const axios = require('axios');

/**
 * Updates a monitor with given id and JSON body
 *
 * @param {string} id - The ID of the monitor, set by Datadog.
 * @param {Object} config - axios configuration
 * @param {Object} body - Monitor body payload
 */
const updateMonitor = async (id, config, body) => {
  try {
    await axios({
      ...config,
      data: body,
      method: 'put',
      url: `/monitor/${id}`,
    });
  } catch (err) {
    core.setFailed(`updateMonitor: Action failed with error ${err}`);
  }
};

module.exports = { updateMonitor };
