# NOC App

Application project for a Network Operations Center (NOC), developed using Node.js and TypeScript, employing Clean Architecture and the Repository pattern

## Dev

1. Clone the .env.template file to .env
2. Configure the environment variables

```
PORT=3000
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
```

3. Run `npm install`
4. Run `docker compose up` in the root directory of the project to start the databases
5. Run `npm run dev` / `npm run dev:watch`

## Obtain Gmail Key

[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)
