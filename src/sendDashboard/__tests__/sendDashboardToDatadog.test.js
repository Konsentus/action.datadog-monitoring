const { sendDashboardToDatadog } = require('../sendDashboardToDatadog');

const { checkDashboardPresent } = require('../checkDashboardPresent');
const { updateDashboard } = require('../updateDashboard');
const { createDashboard } = require('../createDashboard');

jest.mock('../checkDashboardPresent');
jest.mock('../updateDashboard');
jest.mock('../createDashboard');

describe('./sendDashboardToDatadog', () => {
  test('if id returned update dashboard', async () => {
    checkDashboardPresent.mockResolvedValueOnce('123456');

    await sendDashboardToDatadog({}, {});

    expect(updateDashboard).toHaveBeenCalledTimes(1);
  });
  test('if id not returned create dashboard', async () => {
    checkDashboardPresent.mockResolvedValueOnce(false);

    await sendDashboardToDatadog({}, {});

    expect(createDashboard).toHaveBeenCalledTimes(1);
  });
});
