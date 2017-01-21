# Runout.io

Runout.io is a Web Multiplayer Platform Game project.

## Install the development kit

Clone the repository

```sh
git clone https://github.com/kozlown/runout.io.git
```

Install server's dependencies

```sh    
cd runout.io
npm install
```

Install front's dependencies

```sh
cd ./front/react-app
npm install
```

Install global dependencies to launch the server

```sh
npm install -g pm2 nodemon
```

## Commands

| Command | Description | When to use it
| --- | --- | --- |
| **npm run build** | build front | When you only want to (re)build the **frontend** |
| **npm run webpack** | Start webpack-dev-server | When you want to work on **frontend with live reload** |
| **npm run start** | build front  + launch server with nodemon | When you want to work on **backend with live reload** |
| **npm run prod** | build front + launch server with pm2 | When you want to **launch** the server in **production** |
| **npm run stop** | stop + remove app running in production | When you want to totally **stop** server in **production** |
