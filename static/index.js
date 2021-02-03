let movies

async function best(){
    await fetch('/best')
    .then(res => {
        return res.json()
    })
    .then(data => {
        movies = data
    })

    let table = document.createElement('table')
    movies.forEach((movie, index) => {
        let tr = document.createElement('tr')
        let rank = document.createElement('td')
        let poster = document.createElement('td')
        let title = document.createElement('td')
        let year = document.createElement('td')
        let rating = document.createElement('td')
        let img = document.createElement('img')


        tr.className = 'row'

        rank.innerText = index+1
        rank.className = 'rank'


        img.src = movie.img

        poster.appendChild(img)
        poster.className = 'poster'
        
        title.innerText = movie.title
        title.className = 'title'

        year.innerText = movie.year
        year.className = 'year'

        rating.innerHTML = `<svg class='rate' viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
    </svg> ${movie.rating}` 
        rating.className = 'rating'

        tr.appendChild(rank)
        tr.appendChild(poster)
        tr.appendChild(title)
        tr.appendChild(year)
        tr.appendChild(rating)

        table.appendChild(tr)
    })

    document.querySelector('.app').appendChild(table)

    document.querySelector('.loading').style.display = 'none'
    
} 

best()