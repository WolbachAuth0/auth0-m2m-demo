
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


### Configure M2M Client

create a new M2M application and give it an 
appropriate name (e.g. "M2M Demo Client").

![M2M Demo Client](https://raw.githubusercontent.com/WolbachAuth0/auth0-m2m-demo/main/public/m2m-client.png?raw=true)

Go to the APIs tab of your new M2M application and Authorize the 
M2M Demo API created above. Make sure to grant all of the permissions to the M2M Client


![Scopes](https://github.com/WolbachAuth0/attack-demo/blob/main/public/scopes.png?raw=true)

Then go to the settings tab of the M2M application and make a note of
the `Domain`, `Client ID`, `Client Secret`.

### Add Environment Variables

Open a terminal and cd into the directory where this code base is 
stored. Then 

```bash
cd <path-to-this-project>/src/tenants
mkdir <name-of-your-tenant>
```

The attack demo will use this folder name when it presents to you the 
choice of which tenants to simulate attacks against. Inside this 
folder, create a `.env` file and add the following data do it.

```txt
TENANT_NAME=<your-tenant-name>
AUTH0_DOMAIN=<m2m-application-domain>
AUTH0_CLIENT_SECRET=<m2m-application-client-secret>
AUTH0_CLIENT_ID=<m2m-application-client-id>
```

You're now ready to simulate attacks against your tenant.
## Run Locally

From a terminal, cd into the attack-demo directory and run

```bash
  npm run start
```

the attack demo tool will execute.
