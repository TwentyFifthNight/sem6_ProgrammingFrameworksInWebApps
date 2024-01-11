# Steam Prices Web App

## Overview

Web app for browsing steam games with prices and discount values.

## Requirements

* Node v18.12.1
* npm v9.6.3

## Configuration

* In the project you will find example.env file. You can rename it to .env.
* Add link to MongoDB in server/.env file. Variable key should be DB.
* Add your own JSON Web Token private key to .env file. Variable key should be JWTPRIVATEKEY.
* Run "npm i" command in client and server folders.
* Run "node ." command in server service.
* Run "npm start" command in client service.

## Data Sources

* [SteamSpy API](https://steamspy.com/api.php)
* [Steam App Details API](https://wiki.teamfortress.com/wiki/User:RJackson/StorefrontAPI)