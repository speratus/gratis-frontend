# Gratis
Gratis is an app to help users express their gratefulness to their friends and those they follow.

## Features

* Add friends and follow other users.
* Write shoutouts for those you appreciate.
* Edit your shoutouts.
* View Shoutouts other users have mentioned you in.
* View your friends' shoutouts.

## Requirements
First, make sure you can download and setup the backend: https://github.com/speratus/gratis-backend.

Gratis requires [node](https://nodejs.org/en/) `13.1.0` or higher to run. There are several ways to get node.
If you have [Homebrew](https://brew.sh) installed, you can install node by running these commands:
```
brew install nvm
nvm install v13.1.0
```
You can test whether you have the correct version of node installed by running
```
node --version
```

### Optionally install `Yarn`
Gratis was built using [yarn](https://yarnpkg.com), so if you want to use yarn in your environment,
run the following command to install it.
```
brew install yarn
```

## Installation
Start by cloning the repo.
```
git clone https://github.com/speratus/gratis-frontend
```
Navigate into the directory where it is saved and run
```
yarn install
```
If you prefer to use `npm` instead, delete `yarn.lock` and then run
```
npm install
```
This will download all the necessary dependencies.

## Starting Gratis
Once all the dependencies have been downloaded, make the backend is running by [following these instructions](https://github.com/speratus/gratis-backend#running-the-server).

Once the server has started, start the frontend by running
```
yarn start
```
or
```
npm start
```
This will open a browser window. From there, you should be good to go!

## Dependencies

* [React](https://reactjs.org)
* [React Router DOM](https://github.com/ReactTraining/react-router#readme)
* [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React#readme)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).