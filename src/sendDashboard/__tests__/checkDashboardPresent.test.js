const core = require('@actions/core');
const axios = require('axios');
const { checkDashboardPresent } = require('../checkDashboardPresent');

jest.mock('@actions/core');
jest.mock('axios');

describe('./checkDashboardPresent', () => {
  test('When dashboard is present return id', async () => {
    const title = 'dummy test name';
    const config = {};

    axios.mockResolvedValue({
      data: {
        dashboards: [
          { title: 'dummy test name', id: '12345' },
          { title: 'not found test name', id: '54321' },
        ],
      },
    });

    const result = await checkDashboardPresent(title, config);

    expect(result).toEqual('12345');
  });
  test('When dashboard is not present return false', async () => {
    const title = 'dummy test name';
    const config = {};

    axios.mockResolvedValue({
      data: { dashboards: [{ title: 'not found dashboard', id: '12345' }] },
    });

    const result = await checkDashboardPresent(title, config);

    expect(result).toEqual(false);
  });

  test('More than 1 dashboard is not present', async () => {
    const title = 'dummy test name';
    const config = {};

    axios.mockResolvedValue({
      data: {
        dashboards: [
          { title: 'dummy test name', id: '12345' },
          { title: 'dummy test name', id: '12346' },
        ],
      },
    });
    const result = await checkDashboardPresent(title, config);

    expect(core.setFailed).toHaveBeenCalledTimes(1);
    expect(result).toEqual(Error('Check returned too many values'));
  });
});
