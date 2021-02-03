const express = require('express')
const app = express()
const port = 3000
const fetch = require('node-fetch')
const cheerio = require('cheerio')
let page
let movies = []

app.use(express.static('static'))

fetch('https://www.imdb.com/chart/top/?ref_=nv_mv_250')
    .then(res => res.text())
    .then(body => page = body)

app.get('/best', async (req, res) => {
  //res.send('Hello World!')
  //res.sendFile(path.join(__dirname + '/index.html'))
  const $ = cheerio.load(page)

  $('.lister-list').children().each(function (i, elem) {
      movie = {
          img : $(this).children('.posterColumn').children('a').children('img').attr('src'),
          title: $(this).children('.posterColumn').children('a').children('img').attr('alt'),
          year: $(this).children('.titleColumn').children('.secondaryInfo').text().slice(1).slice(0,-1),
          rating: $(this).children('.ratingColumn.imdbRating').text().trim()
      }
    movies.push(movie)
  })
  console.log(movies)
  res.json(movies)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})