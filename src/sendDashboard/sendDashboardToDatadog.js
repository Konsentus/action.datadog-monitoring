const core = require('@actions/core');
const { checkDashboardPresent } = require('./checkDashboardPresent');
const { updateDashboard } = require('./updateDashboard');
const { createDashboard } = require('./createDashboard');

/**
 * Creates or uploads a dashboard to datadog, depending on dashboard existence.
 *
 * @param {Object} parsedTemplate - Full parsed dashboard template to be sent to datadog
 * @param {Obbject} axiosConfig - Axios configuration for valid request.
 */
const sendDashboardToDatadog = async (parsedTemplate, axiosConfig) => {
  const { title } = parsedTemplate;

  const id = await checkDashboardPresent(title, axiosConfig);

  if (id) {
    core.info('Updating dashboard.');
    await updateDashboard(id, axiosConfig, JSON.stringify(parsedTemplate));
  } else {
    core.info('Creating dashboard.');
    await createDashboard(axiosConfig, JSON.stringify(parsedTemplate));
  }
};

module.exports = { sendDashboardToDatadog };
