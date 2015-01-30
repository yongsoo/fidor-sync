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
Fidor-sync monitors and syncs payments from both a gateway and from Fidor. You must have a Fidor developer account and a Knox Payments developer account as well as two Ripple gateways, one for handling USD and one for handling EUR.

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

KNOX:
- KNOX_URL
- KNOX_API_KEY
- KNOX_API_PASSWORD

EUR_GATEWAY:
- EUR_GWD_URL
- EUR_GWD_USERNAME
- EUR_GWD_PASSWORD
- EUR_GWD_HOT_WALLET
- EUR_GWD_COLD_WALLET

USD_GATEWAY:
- USD_GWD_URL
- USD_GWD_USERNAME
- USD_GWD_PASSWORD
- USD_GWD_HOT_WALLET
- USD_GWD_COLD_WALLET