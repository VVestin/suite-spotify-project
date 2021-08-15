const dotenv = require('dotenv')
const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')

dotenv.config()

const app = express()
app.set('port', 8888)

const scopes = ['user-library-read', 'user-read-email', 'playlist-read-private']

const spotifyApi = new SpotifyWebApi({
   redirectUri: `http://localhost:${app.get('port')}/callback`,
   clientId: process.env.SPOTIFY_CLIENT_ID,
   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

app.get('/login', (req, res) => {
   res.redirect(spotifyApi.createAuthorizeURL(scopes))
})

app.get('/callback', (req, res) => {
   const error = req.query.error
   const code = req.query.code
   const state = req.query.state

   if (error) {
      console.error('Callback Error:', error)
      res.send(`Callback Error: ${error}`)
      return
   }

   spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
         const access_token = data.body['access_token']
         const refresh_token = data.body['refresh_token']
         const expires_in = data.body['expires_in']

         spotifyApi.setAccessToken(access_token)
         spotifyApi.setRefreshToken(refresh_token)

         console.log('access_token:', access_token)
         console.log('refresh_token:', refresh_token)

         console.log(
            `Sucessfully retreived access token. Expires in ${expires_in} s.`
         )
         res.send('Success! You can now close the window.')

         setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken()
            const access_token = data.body['access_token']

            console.log('The access token has been refreshed!')
            console.log('access_token:', access_token)
            spotifyApi.setAccessToken(access_token)
         }, (expires_in / 2) * 1000)
      })
      .catch(error => {
         console.error('Error getting Tokens:', error)
         res.send(`Error getting Tokens: ${error}`)
      })
})

console.log('spotify client id', process.env.SPOTIFY_CLIENT_ID)

app.listen(app.get('port'), () => {
   console.log('Server started on port', app.get('port'))
})
