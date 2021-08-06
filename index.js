const express = require('express')
const request = require('request-promise')

const app = express()
const port = process.env.PORT || 3000

const API_KEY = '15c58786873323db92666bc9693eeae2'

const generateScrapperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.get('/', (req, res) => {
  res.send('Amazon Product Scrapper API')
})

//GET PRODUCT DETAILS
app.get('/product/:productName/:productId', async (req, res) => {
  const { productId, productName } = req.params
  const { apiKey } = req.query
  try {
    const response = await request(
      `${generateScrapperUrl(apiKey)}&url=https://www.amazon.com/${productName}/dp/${productId}`
    )
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

//GET PRODUCT REVIEWS
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params
  const { apiKey } = req.query
  try {
    const response = await request(`${generateScrapperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`)
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
