# action.datadog-monitoring

GitHub action to allow dashboard/monitor templates to be uploaded automatically, requires template variables to be named `TEMPLATE_*` and templating is called with {{TEMPLATE_*}}.
To handle Datadog {{#is_alert}} a raw helpers exists please use this to set it. {{ raw '{{#is_alert}}'}}

e.g.

monitor.template.json

```json
{
  "title":"{{TEMPLATE_ENV}} - My awesome monitor:",
  "message":"{{ raw '{{#is_alert}}'}} Monitor failed in env: {{TEMPLATE_ENV}} {{ raw '{{/is_alert}}'}}"
}
```

Would then be accessed by the following

```yaml
env:
  DATADOG_TOKEN: ${{ secrets.DATADOG_TOKEN }}
  DATADOG_APPLICATION_KEY: ${{ secrets.DATADOG_APPLICATION_KEY }}

jobs:
  main: Deploy app
    runs-on: ubuntu-latest
    steps:
      - name: Deploy application
        uses: application-deploy-action

        name: deploy monitor
        uses: konsentus/action.datadog-monitoring@v1.0
        with:
          template_location: './integrations/datadog/monitors/monitor.template.json'
          template_type: 'monitor'
          datadog_url_location: 'com'
        env:
          TEMPLATE_ENV: test
```

This would result in a monitor template with output.

```json
{
  "title":"test - My awesome monitor:",
  "message":"{{#is_alert}} Monitor failed in env: test {{/is_alert}}"
}
```

## Local development

Installing and running tests

`npm i`

`npm run unit-test`

## CI/CD

GHA set up to run unit-tests and snyk on build
