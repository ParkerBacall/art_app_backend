const PORT = process.env.PORT || 9001
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const user = require('./routes/user')
const login = require('./routes/login')
const genre = require('./routes/genre')
const artists = require('./routes/artists')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})
app.use(artists)
app.use(user)
app.use(login)
app.use(genre)

