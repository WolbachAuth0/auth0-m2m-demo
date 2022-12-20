
# Okta CIC Machine-to-machine Auth Demo

The purpose of this project is to provide a CLI tool for demonstrating how M2M clients work in 
the Okta Consumer Identity Cloud. The command line tool simply requests a token from a machine-to-machine
client application registered in your demo tenant
attacks.

## Set Up CIC Tenant

To run this project you will need a seperate `.env` file for each CIC
tenant you wish to simulate attacks against. You can set up the attack
demo to run agains as many CIC tenants as you want. You need only to 
follow the instructions below for each of your tenants.

### Configure API

In your CIC tenant, create a new API and give it an appropriate name (e.g. "M2M Demo API")

![M2M Demo API](https://raw.githubusercontent.com/WolbachAuth0/auth0-m2m-demo/main/public/m2m-api.png?raw=true)

Give the API a unique identifier in the form of a url (e.g. ""). Make a note of this identifier, you'll need it later.

Next, open up the "Permissions" tab of the API and create the following permissions.

| Permission | Description |
|------------|-------------|
|create:resource | POST /resource endpoint |
|read:resource | GET /resource endpoint |
|update:resource | PUT /resource/:id endpoint |	
|delete:resource | DELETE /resource/:id endpoint |

![Permissions](https://raw.githubusercontent.com/WolbachAuth0/auth0-m2m-demo/main/public/m2m-permissions.png?raw=true)

### Configure M2M Client

Next, create a new M2M application and give it an appropriate name (e.g. "M2M Demo Client").

![M2M Demo Client](https://raw.githubusercontent.com/WolbachAuth0/auth0-m2m-demo/main/public/m2m-client.png?raw=true)

Go to the APIs tab of your new M2M application and Authorize the 
M2M Demo API created above. Make sure to grant all of the permissions to the M2M Client

![Authorize](https://raw.githubusercontent.com/WolbachAuth0/auth0-m2m-demo/main/public/m2m-authorize.png?raw=true)

Then go to the settings tab of the M2M application and make a note of
the `Domain`, `Client ID`, `Client Secret`.

### Add Environment Variables

Open a terminal and cd into the directory where this code base is stored. In that directory, create a `.env` file.
Put the following in the `.env` file and save the file.

```txt
DOMAIN=<m2m-application-domain>
CLIENT_SECRET=<m2m-application-client-secret>
CLIENT_ID=<m2m-application-client-id>
AUDIENCE=<m2m-demo-api-identifier>

PORT=8081
API_BASE_URL=http://localhost:8081
```

## Run Locally

Open up two terminal windows and in both, cd into the directory where you've installed this code base.
In the first terminal, start the API server with the command

```bash
  npm run server
```

That will start up the API which will consume the API tokens.

![Server](https://raw.githubusercontent.com/WolbachAuth0/auth0-m2m-demo/main/public/npm-run-server.png?raw=true)

To simulate fetching a new M2M token and using it in a GET request, use the second terminal with the command

```bash
  npm run m2m
```

![Run Demo](https://raw.githubusercontent.com/WolbachAuth0/auth0-m2m-demo/main/public/npm-run-m2m.png?raw=true)

