# action.datadog-monitoring

GitHub action to allow dashboard/monitor templates to be uploaded automatically, requires template variables to be named `TEMPLATE_*` and templating is called with {{TEMPLATE_*}}.
To handle Datadog {{#is_alert}} a raw helpers exists please use this to set it. {{ raw '{{#is_alert}}'}}

e.g.

Template saved to: `./integrations/datadog/monitors/monitor.template.json`

```json
{
  "title":"{{TEMPLATE_ENV}} - My awesome monitor:",
  "message":"{{ raw '{{#is_alert}}'}} Monitor failed in env: {{TEMPLATE_ENV}} {{ raw '{{/is_alert}}'}}"
}
```

Would then be implement in a workflow by the following

```yaml
env:
  DATADOG_TOKEN: ${{ secrets.DATADOG_TOKEN }}
  DATADOG_APPLICATION_KEY: ${{ secrets.DATADOG_APPLICATION_KEY }}

jobs:
  main: Deploy app
    runs-on: ubuntu-latest
    steps:
      - name: Deploy application
        uses: application-deploy-action #

      - name: deploy monitor
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

## Inputs

- template_location: string - location of the monitor/dashboard template
- template_type: string - monitor/dashboard - depending on what you have selected
- datadog_url_location: string com/eu - depending where your datadog instace is located

## Local development

Installing and running tests

`npm i`

`npm run unit-test`

## CI/CD

GHA set up to run unit-tests and snyk on build

## Release process

1. Create a semantically tagged GitHub release.
2. When a release is published or edited, `.github/workflows/publish.yaml` workflow will automatically build project and adjust tags keeping major (v1) and minor (v1.1) tags current to the latest appropriate commit.
