# Monitoring Chart

Dieses Chart bringt Prometheus Operator (kube-prometheus-stack) sowie den Loki Stack als Observability-Fundament mit. Ziel ist es, Metriken des Trading-Backends zu erfassen, Logs zentral zu speichern und per Grafana einzusehen.

## Abhaengigkeiten
- kube-prometheus-stack (Prometheus, Alertmanager, Grafana)
- loki-stack (Loki, Promtail)

Die Helm-Repositorys muessen vor Installation eingebunden sein:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
```

## Installation

```bash
cd helm/monitoring
helm dependency update
helm upgrade --install monitoring . \
	--namespace monitoring \
	--create-namespace
```

Standardmaessig wird Grafana als ClusterIP-Service bereitgestellt. Port-Forwarding ermoeglicht schnellen Zugriff:

```bash
kubectl -n monitoring port-forward svc/monitoring-grafana 3000:80
```

Die Default-Zugangsdaten lauten `admin` und `changeMe123!` (bitte in produktiven Umgebungen anpassen).

## Backend-Metriken

Das Backend liefert Prometheus-Metriken unter `/metrics`. Damit Prometheus diese findet, muss der zugehoerige Kubernetes-Service Labels wie unten tragen:

```yaml
metadata:
	labels:
		app.kubernetes.io/name: backend
spec:
	ports:
		- name: http
			port: 3000
			targetPort: 3000
```

Der ServiceMonitor in `templates/servicemonitor-backend.yaml` sucht genau nach `app.kubernetes.io/name: backend` und erwartet den Port `http`. Namespace-Overrides lassen sich ueber `backendServiceMonitor.namespace` setzen.

## Wichtige Values
- `kube-prometheus-stack.grafana.ingress`: Fuege bei Bedarf Ingress-Konfiguration fuer Grafana hinzu.
- `kube-prometheus-stack.grafana.sidecar.dashboards`: Aktiviert den Dashboard-Sidecar, der ConfigMaps mit Label `grafana_dashboard` importiert.
- `loki-stack.loki.persistence`: Aktiviere Persistenz fuer produktive Umgebungen.
- `backendServiceMonitor.endpoints`: Passe Intervall oder Pfad an, falls das Backend andere Ports nutzt.
- `backendPrometheusRule`: Justiere Schwellwerte fuer Error-Rate (`errorRateThreshold`) und Latenz (`latencyP95Threshold`).
- `kube-prometheus-stack.alertmanager.config`: Hinterlege Empfaenger (E-Mail, Slack, Webhook).

## Grafana
- Port-Forward: `kubectl -n monitoring port-forward svc/monitoring-grafana 3000:80` → `http://localhost:3000`.
- Login: `admin / changeMe123!` (unbedingt anpassen).
- Das Chart liefert eine Beispiel-ConfigMap (`*-grafana-dashboard`) mit HTTP-Metriken + Loki-Logs.
- Weitere Dashboards per ConfigMap (Label `grafana_dashboard`) oder UI importieren.

## Prometheus & Alertmanager
- Prometheus: `kubectl -n monitoring port-forward svc/monitoring-kps-prometheus 9090:9090` → `http://localhost:9090`.
- Alertmanager: `kubectl -n monitoring port-forward svc/monitoring-kps-alertmanager 9093:9093` → `http://localhost:9093`.
- Alerts im Chart beobachten Fehlerquote (`BackendHighErrorRate`) und Latenz (`BackendHighLatencyP95`). Werte im `backendPrometheusRule`-Block anpassen.
- Passe `alertmanager.config.receivers` an (z. B. gueltige Mailadresse, Slack Incoming Webhook, PagerDuty).

## Alerts und Dashboards
- Zusaetzliche Alert- und Dashboard-ConfigMaps koennen unter `templates/` abgelegt werden. Die Grafana-API akzeptiert JSON-Dashboards via `grafana.dashboards`.

## Entwicklungs-Setup
- Teste die komplette Pipeline mit `kind create cluster` oder `k3d cluster create`.
- Nutze `kubectl -n monitoring get servicemonitors` um sicherzustellen, dass Prometheus Operator den Backend-Service erfasst.
- Logs finden sich via `kubectl -n monitoring logs deploy/monitoring-loki-promtail`.