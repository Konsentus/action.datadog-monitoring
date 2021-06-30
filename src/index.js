const { sendMonitorToDatadog } = require('./sendMonitor');
const { sendDashboardToDatadog } = require('./sendDashboard');
const { parseTemplate } = require('./parseTemplate');

module.exports = { sendDashboardToDatadog, sendMonitorToDatadog, parseTemplate };
