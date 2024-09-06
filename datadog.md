e05819be75d28c28111e185087e27988

```shell
DD_API_KEY=3a67b96622ce7379900107a0d36c1a46 
DD_SITE="us5.datadoghq.com"
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```
## 1. Configure the OTLP receiver in your collector configuration file

```yaml
 receivers:
      otlp:
        protocols:
          http:
            endpoint: "localhost:4318"
          grpc:
            endpoint: "localhost:4317"
        
```
## 2. Define a Datadog exporter configured with your Datadog API key.
```yaml

    exporters:
      datadog:
        api:
          site: {'env:DD_SITE'}
          key: {'env:DD_API_KEY'}
        
```

[See an example of a configured Datadog explorer configuration file.](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml)

## 3. Configure a Datadog connector.
The connector collects and calculates trace metrics for 100% of your trace data and sends those trace metrics to Datadog. It is required for collector versions 0.95 and above in order to work with Datadog.
```yaml

    connectors:
      datadog/connector:
            
```
[See an example of a trace metrics YAML file.](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/trace-metrics.yaml)

## 4. Add your Datadog exporter to the ‘exporters’ sections of your configured metrics and traces pipelines.
If you want to collect logs, you can also add your logs pipeline here.
See an example of a logging configuration file.

[See an example of a logging configuration file.](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/logs.yaml)
```yaml

    service:
      pipelines:
        metrics:
          receivers: [datadog/connector, otlp]
          processors: [batch]
          exporters: [datadog/exporter]
      traces:
        receivers: [otlp]
        processors: [batch]
        exporters: [datadog/connector, datadog/exporter]
      logs:
        receivers: [otlp]
        processors: [batch]
        exporters: [datadog/exporter]
           
```
## 5. Configure your collector
To correlate your metrics, logs, and traces, configure your collector to extract the correct hostname and host tags. For instructions based on your architecture, [see our docs](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/logs.yaml).

Here is an example host setup:
```yaml
processors:
      resourcedetection:
        # GCP
        detectors: [env, gcp, system]
        # AWS
        detectors: [env, ecs, ec2, system]
        # Azure
        detectors: [env, azure, system]
        # bare metal
        detectors: [env, system]
        system:
          resource_attributes:
            os.description:
              enabled: true
            host.arch:
              enabled: true
            host.cpu.vendor.id:
              enabled: true
            host.cpu.family:
              enabled: true
            host.cpu.model.id:
              enabled: true
            host.cpu.model.name:
              enabled: true
            host.cpu.stepping:
              enabled: true
            host.cpu.cache.l2.size:
              enabled: true
        timeout: 2s
        override: false
           
```
