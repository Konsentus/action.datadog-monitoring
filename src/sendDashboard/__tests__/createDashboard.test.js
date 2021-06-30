const mockAxios = require('axios');
const { createDashboard } = require('../createDashboard');

jest.mock('axios');
describe('./createDashboard', () => {
  test('axios successful', async () => {
    mockAxios.mockResolvedValueOnce({ status: 200 });
    await expect(createDashboard({}, {})).resolves.toBe();
  });
});
