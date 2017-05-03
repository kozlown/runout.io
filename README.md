# Runout.io

Runout.io is a Web Multiplayer Platform Game project.

## Install

Clone the repository

```sh
git clone https://github.com/kozlown/runout.io.git
```

Install backend's dependencies

```sh    
cd runout.io
npm install
```

Install frontend's dependencies

```sh
cd ./front/react-app
npm install
```

Install global dependencies to launch the server

```sh
npm install -g pm2 nodemon
```

## Configuration

From root directory
```sh
cp config.default.js config.js
```
Then edit `config.js` if you need.

## Commands (to run from root directory)

| Command | Description | When to use it
| --- | --- | --- |
| **npm run buildBack** | **build** only **back** |  |
| **npm run buildFront** | **build** only **front** |  |
| **npm run build** | **build front** and **back** | When you only want to **build the whole app** |
| **npm run watchBack** | build and launch **back** with **live reload** | When you want to work on **backend with live reload** |
| **npm run watchFront** | build and launch **front** with **live reload** | When you want to work on **frontend with live reload** |
| **npm run prod** | **build front and back** + **launch** server with **pm2** | When you want to **launch** the server in **production** |
| **npm run stop** | **stop** + **remove** app running in **production** | When you want to totally **stop** server in **production** |
