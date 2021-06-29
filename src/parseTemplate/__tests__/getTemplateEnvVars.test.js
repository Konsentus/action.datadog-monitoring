const { getTemplateEnvVars } = require('../getTemplateEnvVars');

describe('./getTemplateEnvVars', () => {
  test('Envs are correctly got', () => {
    process.env.TEMPLATE_ENV = 'test';
    process.env.NOT_TEMPLATE_ENV = 'test';
    process.env.TEMPLATE_FOO = 'test';

    expect(getTemplateEnvVars()).toEqual({ TEMPLATE_ENV: 'test', TEMPLATE_FOO: 'test' });
  });

  test('If no envs, return empty', () => {
    process.env = {};
    expect(getTemplateEnvVars()).toEqual({});
  });
});
