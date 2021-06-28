const core = require('@actions/core');

const buildTemplate = (template, parameters) => {
  const builtTemplate = ''; // Use template library to build this (Handlebars?)
  return builtTemplate;
};

const sendMonitorToDatadog = (builtTemplate, params) => {
  return ''; //Use axios (or a DD Axios helper to update or create monitor)
};

const sendDashboardToDatadog = (builtTemplate, params) => {
  return ''; //Use axios (or a DD Axios helper to update or create dashboard)
};

const run = async () => {
  const datadogApiKey = process.env.DATADOG_TOKEN;
  const datadogApplicationKey = process.env.DATADOG_APPLICATION_KEY;
  const configuration = core.getInput('configuration');
  const datadogLocation = core.getInput('datadog_url_location');

  // use fs to get configuration and JSON parse
  // Verify configuration is of right format
  // build and deploy each configuration items with the above helper functions
};

run();
