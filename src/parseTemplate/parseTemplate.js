const Handlebars = require('handlebars');
const fs = require('fs');
const core = require('@actions/core');
const { getTemplateEnvVars } = require('./getTemplateEnvVars');

/**
 * Parses a given JSON file with environment variables starting with `TEMPLATE_`
 *
 * @param {string} templateLocation - location to the template file, must be valid JSON
 * @returns {Object} - Parsed JSON template file.
 */
const parseTemplate = templateLocation => {
  try {
    const templateVars = getTemplateEnvVars();
    const templateToCompile = fs.readFileSync(templateLocation, 'utf8');

    Handlebars.registerHelper('raw', object => object);

    const template = Handlebars.compile(JSON.stringify(templateToCompile));
    return JSON.parse(JSON.parse(template(templateVars)));
  } catch (err) {
    core.error(err.message);
    return new Error(err.message);
  }
};

module.exports = { parseTemplate };
