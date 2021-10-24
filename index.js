import express from 'express'
const app = express()
const port = 3000
import Client from './kanka_client.js'

app.get('/characters', async (req, res) => {
  const kanka = new Client
  const characters = await kanka.get_characters()
  console.log(characters)
  res.send(JSON.stringify(characters))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
