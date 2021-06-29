const { checkMonitorPresent } = require('./checkMonitorPresent');
const { updateMonitor } = require('./updateMonitor');
const { createMonitor } = require('./createMonitor');

/**
 * Creates or uploads a monitor to datadog, depending on monitor existence.
 *
 * @param {Object} parsedTemplate - Full parsed monitor template to be sent to datadog
 * @param {Obbject} axiosConfig - Axios configuration for valid request.
 */
const sendMonitorToDatadog = async (parsedTemplate, axiosConfig) => {
  const { name } = parsedTemplate;

  const id = await checkMonitorPresent(name, axiosConfig);

  if (id) await updateMonitor(id, axiosConfig, JSON.stringify(parsedTemplate));
  else await createMonitor(axiosConfig, JSON.stringify(parsedTemplate));
};

module.exports = { sendMonitorToDatadog };
