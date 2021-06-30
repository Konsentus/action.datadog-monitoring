/**
 * Gathers all environment variables that start with 'TEMPLATE_'
 *
 * @returns {Object[]} - A list of key/value pairs.
 */
const getTemplateEnvVars = () => {
  const result = {};
  const envVars = process.env;
  return Object.keys(envVars)
    .filter(key => key.startsWith('TEMPLATE_'))
    .reduce((_, key) => {
      result[key] = envVars[key];
      return result;
    }, {});
};

module.exports = { getTemplateEnvVars };
