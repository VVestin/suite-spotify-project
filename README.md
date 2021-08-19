# Suite Spotify Project

This is a small project for the take home coding assessment for Suite Studios.

This app was based off the example project description for a Spotify playlist subscription API.

The api includes endpoints for helping a user login to spotify and create an access token to Spotify's API, as well as 2 endpoints: `/get-me` and `/generate-playlist`.

There's also a simple frontend (made with handlebars) to make interacting with the api easier.

# Usage

To setup the project, just run the following:
```sh
git clone https://github.com/VVestin/suite-spotify-project
cd suite-spotify-project
npm install
```

Then to start the server simply execute
```sh
node index.js
```

This opens a server locally on port 8888, which you can open in your browser [http://localhost:8888]().

The webpage should hopefully be straightforward since I didn't finish most of the subscription functionality.

Once you've clicked [login](http://localhost:8888/login) and authenticated with spotify, then two more links should appear for the two endpoints of the API.

Clicking `/generate-playlists` and providing a valid `access_token` as a query parameter will cause a new playlist to be created in your spotify with 10 songs randomly selected from your liked songs.
