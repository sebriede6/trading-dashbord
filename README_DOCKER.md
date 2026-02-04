# Lokale Entwicklung und Start mit Docker Compose

## Voraussetzungen
- Docker und Docker Compose installiert

## Starten aller Services

1. Im Projektverzeichnis (my-fullstack-app) folgenden Befehl ausführen:

   docker-compose up --build

2. Die Services werden gebaut und gestartet:
   - Datenbank (Postgres): Port 5432
   - Backend (Express): Port 5000
   - Frontend (Vite Preview): Port 5173

3. Frontend im Browser öffnen:
   http://localhost:5173

4. Backend-API erreichbar unter:
   http://localhost:5000

## Hinweise
- Die Datenbank speichert Daten im Volume `db_data` (persistente Speicherung).
- Um alle Container zu stoppen:

   docker-compose down

- Um nur das Frontend neu zu bauen:

   docker-compose up --build frontend

## Anpassungen
- Um Umgebungsvariablen zu ändern, passe die Datei `backend/.env` an.
- Für weitere Umgebungen (z. B. Produktion) können zusätzliche Compose-Files genutzt werden.
