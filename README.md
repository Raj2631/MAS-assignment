An authentication system with frontend and backend validations.

## How to run?

To run the project, first we need to install all the packages.
Run these two commands to download the packages for both frontend and backend in the root folder.

```
npm i
```

```
cd frontend && npm i
```

Then to run the complete project, use this command in the root folder:

```
npm run dev
```

To run just the backend, use this command in the root folder:

```
npm run server
```

To run just the client, use this command in the root folder:

```
npm run client
```

## Environment variables

I'm using MongoDB here so we need connect to a cluster, create a cluster with mongodb atlas. To connect it to our project add the connection link in a .env file in the root folder and name it MONGO_URI. I'm also using JWTs so you can add any token you like and name it JWT_TOKEN in the same .env file.

```
MONGO_URI=CONNECTION_LINK
JWT_TOKEN=SOME_TOKEN
```

**The project will not work without this btw**

## Stack used

- Reactjs
- Nodejs
- Expressjs
- MongoDB
