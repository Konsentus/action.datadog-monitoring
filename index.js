const core = require('@actions/core');
const { sendMonitorToDatadog, sendDashboardToDatadog, parseTemplate } = require('./src');

const run = async () => {
  const datadogApiKey = process.env.DATADOG_TOKEN;
  const datadogApplicationKey = process.env.DATADOG_APPLICATION_KEY;
  const templateLocation = core.getInput('template_location');
  const datadogLocation = core.getInput('datadog_url_location');
  const templateType = core.getInput('template_type');

  core.info('templateLocation: ', templateLocation);
  core.info('templateType: ', templateType);

  const axiosConfig = {
    baseURL: `https://api.datadoghq.${datadogLocation}/api/v1/`,
    headers: {
      'Content-Type': 'application/json',
      'DD-API-KEY': datadogApiKey,
      'DD-APPLICATION-KEY': datadogApplicationKey,
    },
  };

  const parsedTemplate = parseTemplate(templateLocation);

  switch (templateType) {
    case 'monitor':
      sendMonitorToDatadog(parsedTemplate, axiosConfig);
      break;
    case 'dashboard':
      sendDashboardToDatadog(parsedTemplate, axiosConfig);
      break;
    default:
      Error('Please select monitor or dashboard');
      break;
  }
};

run();
