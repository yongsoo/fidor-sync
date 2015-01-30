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
Fidor-sync monitors and syncs payments from both a gateway and from Fidor. 

## Dependencies
- Git
- Node.js

## Configuration

Copy config-example.json and paste it into a new file called config.json.

The following environment variables must be set to run Fidor Sync:

- FIDOR_ACCESS_TOKEN
- FIDOR_URL
- FIDOR_USERNAME
- FIDOR_PASSWORD
- FIDOR_ACCOUNT_ID
- FIDOR_CLIENT_ID
- FIDOR_CLIENT_SECRET