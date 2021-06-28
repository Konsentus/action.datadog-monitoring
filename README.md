# action.datadog-monitoring

GitHub action to allow dashboard/monitor templates to be uploaded automatically

## Configuration

As we will be using a templating language, key value pairs will need to be provided to the GHA to allow templating to, it should also be obvious what parameters are used in the templating as each monitor/dashboard has the potential to be unique.

### configuration file

Path to yaml configuration file which will deploy the monitor/dashboard has form of:

```yaml
---
- type: monitor
  template_parameters:
    env:
```

### environment variables

### bring templating out of the action?
