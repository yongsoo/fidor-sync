# fidor-sync
Sends, monitors, tracks, and quotes payments on the Fidor network.

## Installation

````
npm install -g fidor-sync
````

Alternatively, you can build from source:
````
git clone https://github.com/yongsoo/fidor-sync
cd fidor-sync
npm install
npm link
````

## Usage
Fidor-sync runs in the foreground and can be daemonized by the system's process manager. Logs are written directly to stdout.

````
fidor-sync start
````
All interactions with Fidor Sync is done via its REST interface.

## Dependencies
- Git
- Node.js
- Postgres

## Configuration
All config settings are set via environment variables.

The following environment variables must be set to run Fidor Sync:

- PORT
- SSL_CERTIFICATE_PATH
- SSL_KEY_PATH
- DATABASE_DIALECT
- DATABASE_HOST
- DATABASE_NAME
- DATABASE_USER
- DATABASE_PASSWORD
- DATABASE_PORT
- FIDOR_API_URL
- FIDOR_OAUTH_URL
- FIDOR_CLIENT_ID
- FIDOR_CLIENT_SECRET

## Processes
Fidor-sync has several types of processes.

- HTTP server for REST interface
- Initiating incoming payments on Fidor (OAuth)
- Initiating outgoing payments on Fidor

## REST API
### Quotes
Ask for the price of a quote for a Fidor payment

````
POST /quotes
````

Check status of quote including expiration, signature
````
GET /quotes/:id
````

### Payments
Initialize a payment to or from Fidor Sync's Fidor account
````
POST /payments
````

Check status of payment
````
GET /payments/:id
````

Cancel a payment before it is sent
````
DELETE /payments/:id
````

### Notifications
List notifications of successful and failed payments
````
GET /notifications
````

Clear payment notification
````
DELETE /notifications/:id
````