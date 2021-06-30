const { parseTemplate } = require('../parseTemplate');

describe('./parseTemplate', () => {
  test('Happy path', () => {
    process.env.TEMPLATE_ENV = 'dummy environment';
    const results = parseTemplate('src/parseTemplate/__tests__/monitor.template.json');

    expect(results).toEqual({
      message: `{{#is_alert}}
Test healthcheck{{/is_alert}}`,
      name: 'dummy environment test monitor',
      tags: ['type:log', 'env:dummy environment'],
    });
  });
});
