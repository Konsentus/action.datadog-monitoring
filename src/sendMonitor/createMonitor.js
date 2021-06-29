const core = require('@actions/core');
const axios = require('axios');

/**
 * Creates a monitor with a given JSON body
 *
 * @param {Object} config - axios configuration
 * @param {Object} body - Monitor body payload
 */
const createMonitor = async (config, body) => {
  try {
    await axios({
      ...config,
      data: body,
      method: 'post',
      url: '/monitor',
    });
  } catch (err) {
    core.setFailed(`createMonitor: Action failed with error ${err}`);
  }
};

module.exports = { createMonitor };
