# MAS Assignment

Project assignment for internship application at My Analytics School

## How to run?

To run the project, first we need to install all the packages.
Run these two commands to download the packages for both frontend and backend

```
npm i
```

```
cd frontend && npm i
```

Then to run the project, use this command:

```
npm run dev
```

To run just the backend, use this command:

```
npm run server
```

To run just the client, use this command:

```
npm run client
```

## Setup Environment File

I'm using MongoDB here so we need connect to a cluster, create a cluster with mongodb atlas. To connect it to our project add the connection link in a .env file in the root folder and name it MONGO_URI. I'm also using a JWTs so you can add any token you like and name it JWT_TOKEN in the same .env file.

```
MONGO_URI=CONNECTION_LINK
JWT_TOKEN=SOME_TOKEN
```

## Stack used

- Reactjs
- Nodejs
- Expressjs
- MongoDB
