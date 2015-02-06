# fidor-sync
ALPHA SOFTWARE

Fidor bridge that syncs payments from a gateway to Fidor and vice versa.

## Installation

````
npm install -g fidor-sync
````

Alternatively, you can build from source:
````
git clone https://github.com/yongsoo/fidor-sync
cd fidor-sync
npm install
````

## Usage
Fidor-sync monitors and syncs payments from both a EUR gateway and from Fidor. You must have a Fidor developer account and a Ripple gateway for handling EUR.

## Dependencies
- Git
- Node.js

## Configuration

Copy config-example.json and paste it into a new file called config.json.

The following environment variables must be set to run Fidor Sync:

FIDOR:
- FIDOR_ACCESS_TOKEN
- FIDOR_URL
- FIDOR_USERNAME
- FIDOR_PASSWORD
- FIDOR_ACCOUNT_ID
- FIDOR_CLIENT_ID
- FIDOR_CLIENT_SECRET

EUR_GATEWAY:
- EUR_GATEWAY_URL
- EUR_GATEWAY_USERNAME
- EUR_GATEWAY_PASSWORD
- EUR_GATEWAY_HOT_WALLET
- EUR_GATEWAY_COLD_WALLET