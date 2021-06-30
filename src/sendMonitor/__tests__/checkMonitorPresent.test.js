const core = require('@actions/core');
const axios = require('axios');
const { checkMonitorPresent } = require('../checkMonitorPresent');

jest.mock('@actions/core');
jest.mock('axios');

describe('./checkMonitorPresent', () => {
  test('When Monitor is present return id', async () => {
    const title = 'dummy test name';
    const config = {};

    axios.mockResolvedValue({
      data: {
        monitors: [{ title: 'dummy test name', id: '12345' }],
      },
    });

    const result = await checkMonitorPresent(title, config);

    expect(result).toEqual('12345');
  });
  test('When monitor is not present return false', async () => {
    const title = 'dummy test name';
    const config = {};

    axios.mockResolvedValue({
      data: { monitors: [] },
    });

    const result = await checkMonitorPresent(title, config);

    expect(result).toEqual(false);
  });

  test('More than 1 Monitor is not present', async () => {
    const title = 'dummy test name';
    const config = {};

    axios.mockResolvedValue({
      data: {
        monitors: [
          { title: 'dummy test name', id: '12345' },
          { title: 'dummy test name', id: '12346' },
        ],
      },
    });
    const result = await checkMonitorPresent(title, config);

    expect(core.setFailed).toHaveBeenCalledTimes(1);
    expect(result).toEqual(Error('Check returned too many values'));
  });
});
