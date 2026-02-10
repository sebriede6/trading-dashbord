# Trading Journal Dashboard

Ein Full-Stack-Projekt fuer Trader:innen, die ihre Performance dokumentieren, auswerten und aktiv verbessern moechten. Die Anwendung kombiniert ein modernes React-Frontend mit einem Express/PostgreSQL-Backend, GitHub-OAuth, interaktiven Statistiken und praxisnahen Lerninhalten.

## Inhaltsverzeichnis
- [Demo & Screenshots](#demo--screenshots)
- [Highlights](#highlights)
- [Architekturueberblick](#architekturueberblick)
- [Technologie-Stack](#technologie-stack)
- [Projektstruktur](#projektstruktur)
- [Lokales Setup](#lokales-setup)
- [Umgebungsvariablen](#umgebungsvariablen)
- [Datenbank & Migrationen](#datenbank--migrationen)
- [Tests & Qualitaetssicherung](#tests--qualitaetssicherung)
- [Deployment-Ideen](#deployment-ideen-azure--aws)
- [Fuehrungen durch die App](#fuehrungen-durch-die-app)
- [API-Ueberblick](#api-ueberblick)
- [Roadmap & Beitragen](#roadmap--beitragen)
- [Monitoring](#monitoring)

## Demo & Screenshots
- **Live-Demo**: _noch nicht deployt_
- **Screencast**: _Optional hier verlinken._
- **Top-Views (Auswahl)**
  - ![Home Desktop](docs/screenshots/home-desktop.png)
  - ![Login](docs/screenshots/login.png)
  - ![Trading Formular](docs/screenshots/trading-formular.png)
  - ![Trading Historie](docs/screenshots/trading-formular3.png)
  - ![Statistiken](docs/screenshots/statistics.png)
  - ![Statistiken Lightmode](docs/screenshots/lightmode-example.png)
  - ![Todos](docs/screenshots/todos.png)
  - ![Profil](docs/screenshots/profile.png)
  - ![Grafana Dashboard](docs/screenshots/grafana-dashboard.png)
  - ![Alertmanager](docs/screenshots/alert-manager.png)
  - ![Prometheus](docs/screenshots/prometheus.png)

**Galerie (alle Screenshots)**

![home-desktop](docs/screenshots/home-desktop.png)
![login](docs/screenshots/login.png)
![trading-formular](docs/screenshots/trading-formular.png)
![trading-formular3](docs/screenshots/trading-formular3.png)
![tradinformular2](docs/screenshots/tradinformular2.png)
![statistics](docs/screenshots/statistics.png)
![statistics2](docs/screenshots/statistics2.png)
![lightmode-example](docs/screenshots/lightmode-example.png)
![lightmode-example2](docs/screenshots/lightmode-example2.png)
![todos](docs/screenshots/todos.png)
![profile](docs/screenshots/profile.png)
![profile2](docs/screenshots/profile2.png)
![about](docs/screenshots/about.png)
![grafana-dashboard](docs/screenshots/grafana-dashboard.png)
![alert-manager](docs/screenshots/alert-manager.png)
![prometheus](docs/screenshots/prometheus.png)
![trading-quiz](docs/screenshots/trading-quiz.png)
![trading-quiz2](docs/screenshots/trading-quiz2.png)
![trading-quiz3](docs/screenshots/trading-quiz3.png)
![trading-strategie-guide](docs/screenshots/trading-strategie-guide.png)
![trading-strategie-guide2](docs/screenshots/trading-strategie-guide2.png)
![trading-strategie-guide3](docs/screenshots/trading-strategie-guide3.png)
![csv-export](docs/screenshots/csv-export.png)
![pdf-export](docs/screenshots/pdf-export.png)
![trading-formular2](docs/screenshots/trading-formular2.png)

> Hinweis: Die Bilder liegen relativ unter `docs/screenshots` und werden auf GitHub direkt gerendert.

## Highlights
- **Trading-Cockpit**: Erfassung von Trades inkl. P/L, Pip-Daten, Spread-Kontrolle und Export als PDF.
- **Ziele & Todos**: Priorisierte Ziele, ToDos und Reflexionen gewaehrleisten ein strukturiertes Performance-Coaching.
- **Analytics & Stats**: Recharts-basierte Visualisierungen mit Dark-Mode, Laufzeiten und Kennzahlen.
- **Lernmodul & Quiz**: Interaktive Guides, Quizfragen und modulare Lerninhalte fuer skalierbares Wissen.
- **GitHub OAuth & klassische Authentifizierung**: Login per GitHub oder Passwort mit JWT-Token.
- **Dark-/Light-Mode**: Animierte Lampe, persistente Praeferenzen, dynamische Helligkeitsregler.
- **Export & Dokumentation**: PDF-Export, automatischer Spread-Check sowie Startkapital-Verwaltung.
- **Observability**: Prometheus-Metriken und Loki-Logs stehen ueber Helm-Chart bereit.

## Architekturueberblick
```mermaid
flowchart LR
    subgraph Frontend [React Single Page App]
        Home[Home & Hero]
        Trading[Trading-Formulare]
        Stats[Statistiken]
        Todos[Todos & Ziele]
        Quiz[Quiz & Guides]
    end

    subgraph Backend [Express API]
        AuthCtrl[Auth Controller]
        TradeCtrl[Trade Controller]
        TodoCtrl[Todo Controller]
        GoalsCtrl[Goals Controller]
        ProfileCtrl[Profile Controller]
        GithubOAuth[GitHub OAuth Flow]
        Startkapital[Startkapital Service]
    end

    subgraph DB [PostgreSQL]
        Users[(users)]
        Trades[(trades)]
        Todos[(todos)]
        Goals[(goals)]
    end

    Frontend <--> Backend
    Backend <--> DB
    GithubOAuth --> GitHub[(GitHub API)]
```

## Technologie-Stack
- **Frontend**: React 19, Vite, TailwindCSS 4, Framer Motion, React Router 7, Recharts, lucide-react Icons.
- **Backend**: Node 22+, Express 5, PostgreSQL, JWT, bcrypt, Winston-Logging.
- **Auth**: Klassischer Login + GitHub OAuth.
- **Testing**: Vitest (Frontend & Backend), Testing Library, Playwright fuer E2E.
- **DevOps**: Dockerfiles fuer Frontend & Backend, Terraform-Snippets in `infra`, Helm Charts fuer Kubernetes-Deployments.

## Projektstruktur
```text
my-fullstack-app/
├─ backend/            # Express-Server, Routen, Controller, SQL-Migrationen
├─ frontend/           # React SPA
├─ docs/
│  └─ screenshots/     # Platz fuer Praesentationsbilder (per .gitkeep angelegt)
├─ helm/               # Kubernetes Charts (nginx, postgres, monitoring)
└─ infra/              # Terraform-Infrastruktur (Backend, Netzwerk, Outputs)
```

## Lokales Setup
1. **Repository klonen**
   ```bash
   git clone https://github.com/<USER>/trading-dashbord.git
   cd trading-dashbord/my-fullstack-app
   ```
2. **Backend installieren & starten**
   ```bash
   cd backend
   npm install
   cp .env.example .env   
   npm run dev            
   ```
3. **Frontend installieren & starten**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env   # VITE_API_URL konfigurieren
   npm run dev            # startet Vite auf http://localhost:5173
   ```
4. **Mit Docker (optional)**
  - `docker build -t trading-backend ./backend`
  - `docker build -t trading-frontend ./frontend`
  - Eine `docker-compose.yml` kann schnell ergaenzt werden, falls Deployment mit gemeinsamen Netzen gewuenscht ist.

## Umgebungsvariablen
| Bereich   | Variable                 | Beschreibung                                         |
|-----------|--------------------------|------------------------------------------------------|
| Backend   | `PORT`                   | Port des Express-Servers (Standard: 3000)            |
| Backend   | `DATABASE_URL`           | PostgreSQL-Connection-String                         |
| Backend   | `JWT_SECRET`             | Geheimnis zur Signierung von JWTs                    |
| Backend   | `GITHUB_CLIENT_ID`       | OAuth Client ID fuer GitHub                          |
| Backend   | `GITHUB_CLIENT_SECRET`   | OAuth Client Secret                                  |
| Backend   | `FRONTEND_URL`           | Basis-URL der SPA fuer OAuth Redirects               |
| Frontend  | `VITE_API_URL`           | Basis-URL fuer API-Aufrufe (z. B. `http://localhost:3000/api`) |

> Empfehlung: Fuer lokale Entwicklung eignet sich eine `.env` im Backend sowie `.env.local` im Frontend. Die Variablen werden durch `dotenv` bzw. Vite automatisch geladen.

## Datenbank & Migrationen
- SQL-Migrationen liegen in `backend/models` (nummeriert).
- `init.sql` erzeugt Basistabellen (u. a. `users`, `trades`, `todos`, `goals`).
- Zusaetzliche Migrationen erweitern die Struktur (Priority-Felder, PnL, Pip-Mode, usw.).
- Migrationen lassen sich beispielsweise mit `psql` oder `node-pg-migrate` anwenden. Eine einfache Reihenfolge:
  ```bash
  psql "$DATABASE_URL" -f backend/models/init.sql
  for file in backend/models/00*-*.sql; do
    psql "$DATABASE_URL" -f "$file"
  done
  ```

## Tests & Qualitaetssicherung
- `npm run lint` (Front- & Backend) fuer ESLint + Prettier-Checks.
- `npm run test` fuehrt Vitest mit Coverage aus.
- `npm run test:e2e` bzw. `npm run test:e2e:ui` im Frontend starten Playwright.
- Husky & lint-staged (optional aktivieren) verhindern fehlerhafte Commits.

## Deployment-Ideen (Azure & AWS)
1. **Azure (seriös, budgetschonend)**
  - Frontend: Static Web Apps oder Storage Static Website (+ optional Azure CDN).
  - Backend: App Service (Free/Basic) oder Container Apps (consumption) mit kleiner Postgres-Instanz (Flexible Server Basic) oder kostengünstiger VM-DB.
  - Observability: Azure Monitor/Log Analytics; bei AKS kube-prometheus-stack per Helm.
2. **AWS (seriös, Free-Tier-freundlich)**
  - Frontend: S3 + CloudFront (kleines CDN, Free-Tier-freundlich).
  - Backend: App Runner (pay-per-use) oder ECS Fargate klein; DB als RDS Free Tier (t2.micro) oder Aurora Serverless v2 bei wenig Last.
  - Monitoring/Logs: CloudWatch; bei EKS kube-prometheus-stack per Helm.
3. **Kubernetes (optional)**
  - Helm-Charts unter `helm/` fuer Rollouts; Ingress/Cert-Manager fuer HTTPS; lokal kind/k3d, spaeter AKS/EKS.
4. **Infra-as-Code**
  - `infra/` als Startpunkt; fuer Azure Bicep/Terraform oder AWS Terraform erweitern (Netz, DB, Compute, CDN).

## Monitoring
- Backend exportiert Prometheus-Metriken unter `/metrics` und tracked jede Anfrage per Histogramm.
- Helm-Chart in [helm/monitoring](helm/monitoring/README.md) installiert kube-prometheus-stack, Grafana sowie Loki.
- Schnellstart:
  ```bash
  cd helm/monitoring
  helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
  helm repo add grafana https://grafana.github.io/helm-charts
  helm dependency update
  helm upgrade --install monitoring . --namespace monitoring --create-namespace
  kubectl -n monitoring port-forward svc/monitoring-grafana 3000:80
  ```
- Stelle sicher, dass der Backend-Service in Kubernetes das Label `app.kubernetes.io/name=backend` besitzt und einen Port `http` bereitstellt. Dann greift der ServiceMonitor automatisch zu.
- Grafana Login (Standard): `admin / changeMe123!` → direkt aendern; Dashboard `Backend Overview` wird automatisch geladen.
- Prometheus UI via `kubectl -n monitoring port-forward svc/monitoring-kps-prometheus 9090:9090` erreichbar, Alertmanager via `kubectl -n monitoring port-forward svc/monitoring-kps-alertmanager 9093:9093`.
- Passe `helm/monitoring/values.yaml` an (z. B. Alert-Empfaenger, Persistenz, Ingress) bevor du produktive Cluster nutzt.

## Fuehrungen durch die App
_Bitte fuegen Sie reale Screenshots in `docs/screenshots` ein und passen Sie die Dateinamen an._

| Seite / Feature           | Beschreibung | Screenshot |
|---------------------------|--------------|------------|
| Home & Onboarding         | Hero-Sektion, Call-to-Action, GitHub Login | ![Home](docs/screenshots/home-desktop.png) |
| Login                     | GitHub-/Passwort-Login | ![Login](docs/screenshots/login.png) |
| Trading-Journal           | Trade-Erfassung, Filter, Export | ![Trading](docs/screenshots/trading-formular.png) |
| Trading-Historie          | Übersicht + Varianten | ![Trading Historie](docs/screenshots/trading-formular3.png) |
| Statistiken (Dark)        | KPI-Kacheln, Charts | ![Stats](docs/screenshots/statistics.png) |
| Statistiken (Light)       | Lightmode-Variante | ![Stats Light](docs/screenshots/lightmode-example.png) |
| Todos & Ziele             | Priorisierte Todo-Liste mit Inline-Edit | ![Todos](docs/screenshots/todos.png) |
| Profil & Einstellungen    | Startkapital, Profil, Logout | ![Profil](docs/screenshots/profile.png) |
| Lernmodule & Quiz         | Strategien, interaktive Fragen | ![Quiz](docs/screenshots/trading-quiz.png) |
| Strategien / Guides       | Schritt-fuer-Schritt-Guides | ![Guide](docs/screenshots/trading-strategie-guide.png) |
| Exporte                   | CSV/PDF-Export | ![Export](docs/screenshots/pdf-export.png) |
| Monitoring (Grafana)      | Backend Overview Dashboard | ![Grafana](docs/screenshots/grafana-dashboard.png) |
| Monitoring (Alertmanager) | Aktive Alerts | ![Alertmanager](docs/screenshots/alert-manager.png) |
| Monitoring (Prometheus)   | Query-UI / Graph | ![Prometheus](docs/screenshots/prometheus.png) |

## API-Ueberblick
| Methode | Endpoint                   | Zweck |
|---------|----------------------------|-------|
| POST    | `/api/auth/register`       | Registriert Nutzer mit Passwort |
| POST    | `/api/auth/login`          | Login per Benutzername oder E-Mail |
| GET     | `/api/auth/github`         | Startet GitHub OAuth Flow |
| GET     | `/api/auth/github/callback`| GitHub Redirect, erstellt JWT |
| GET/POST/PUT/DELETE | `/api/todos`   | Priorisierte Todos verwalten |
| GET/POST             | `/api/trades` | Trades inkl. P/L & Pip-Modi |
| GET/PUT              | `/api/profile`| Profil, Startkapital, Passwortwechsel |
| GET                  | `/api/goals`  | Zielsetzungen abrufen |
| GET/POST             | `/api/startkapital` | Historie & Anpassungen |

> Detail-Implementierungen finden Sie in `backend/controllers` und `backend/routes`.

## Roadmap & Beitragen
- [ ] Seed-Skripte fuer Demo-Daten bereitstellen
- [ ] Automatisierte Migrationen (z. B. via `node-pg-migrate`)
- [ ] Internationale Uebersetzungen (en/de Toggle)
- [ ] CI/CD-Pipeline (GitHub Actions) fuer Tests + Lint
- [ ] Weitere KPIs (z. B. Sharpe Ratio, Drawdown)

Beitraege sind willkommen! Bitte oeffnen Sie erst ein Issue oder verfassen Sie einen kurzen Vorschlag, bevor neue Features umgesetzt werden, damit das Gesamtbild konsistent bleibt.
