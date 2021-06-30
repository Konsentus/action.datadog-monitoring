const { sendMonitorToDatadog } = require('../sendMonitorToDatadog');

const { checkMonitorPresent } = require('../checkMonitorPresent');
const { updateMonitor } = require('../updateMonitor');
const { createMonitor } = require('../createMonitor');

jest.mock('../checkMonitorPresent');
jest.mock('../updateMonitor');
jest.mock('../createMonitor');

describe('./sendMonitorToDatadog', () => {
  test('if id returned update monitor', async () => {
    checkMonitorPresent.mockResolvedValueOnce('123456');

    await sendMonitorToDatadog({}, {});

    expect(updateMonitor).toHaveBeenCalledTimes(1);
  });
  test('if id not returned create monitor', async () => {
    checkMonitorPresent.mockResolvedValueOnce(false);

    await sendMonitorToDatadog({}, {});

    expect(createMonitor).toHaveBeenCalledTimes(1);
  });
});
