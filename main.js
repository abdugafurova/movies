
let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'

let page = localStorage.getItem('page') ? JSON.parse(localStorage.getItem('page')) : 1
let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}` 
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`

let chosen = localStorage.getItem('chosen') ? JSON.parse(localStorage.getItem('chosen')) : renderApi(tokenTop)
let chosenAPI = localStorage.getItem('api') ? JSON.parse(localStorage.getItem('api')) : tokenTop

render(chosen)


function render(res){
    list.innerHTML = null
    for (const i of res) {
        pageNumber.textContent = localStorage.getItem('page') ? JSON.parse(localStorage.getItem('page')) : 1


        let div = document.createElement('div') // kotta divga qo'shib ketishimiz uchun
        let img = document.createElement('img') // src qo'shish kerak, alt
        let div1 = document.createElement('div') // rasm uchun faqat
        let h3 = document.createElement('h3') // nomi uchun
        let span = document.createElement('span') // topligi masalan: 6.9
        let data = document.createElement('span') //sana

        div.className = 'movie'
        div1.className = 'movie-info'
        span.className = 'orange'
        data.className = 'date'

        img.src = `https://image.tmdb.org/t/p/w500${i.poster_path}`
        h3.innerHTML = i.original_title
        span.innerHTML = i.vote_average
        data.innerHTML = i.release_date

        div1.append(h3, span)
        div.append(img, div1, data)
        list.append(div)
        
    }
}


async function searching(){
    list.innerHTML = null

    for (let i of chosen) {
        pageNumber.textContent = localStorage.getItem('page') ? JSON.parse(localStorage.getItem('page')) : 1

        let name = i.original_title.toLowerCase()
        let year = i.release_date.substring(0, 4)
        let scoreI = i.vote_average
 
        const searchKino = search.value.trim().toLowerCase() || name
        const minYear = min.value || year
        const maxYear = max.value || year
        const scoreKino = score.value || scoreI

        if(name.includes(searchKino) && minYear <= year && maxYear >= year && scoreI>=scoreKino){

            let div = document.createElement('div')
            let div1 = document.createElement('div')
            let img = document.createElement('img')
            let h3 = document.createElement('h3')
            let span = document.createElement('span')
            let data = document.createElement('span')

            div.className = 'movie'
            div1.className = 'movie-info'
            span.className = 'orange'
            data.className = 'date'

            img.src = `https://image.tmdb.org/t/p/w500${i.poster_path}`
            h3.innerHTML = i.original_title
            span.innerHTML = i.vote_average
            data.innerHTML = i.release_date

            div1.append(h3, span)
            div.append(img, div1, data)
            list.append(div)
        }   
    }
    search.value = ''
    min.value = ''
    max.value = ''
    score.value = ''

}

async function renderApi(api) {
    let res = await fetch(api)
    res = await res.json()
    localStorage.setItem('chosen', JSON.stringify(res.results))
    localStorage.setItem('api', JSON.stringify(api))
    render(res.results)
}

topKino.onclick = ()=> {
    renderApi(tokenTop)
}
popKino.onclick = ()=> {
    renderApi(tokenPopular)
}
upKino.onclick = ()=> {
    renderApi(tokenUpComing)
}

searchButton.onclick = searching

prev.onclick = async()=>{
    if(page==0) return alert('INVALID PAGE NUMBER')
    page = page-1
    pageNumber.textContent = page
    localStorage.setItem('page', JSON.stringify(page))

    let api = chosenAPI.substring(0, chosenAPI.length-1)
    api = api+page

    renderApi(api)
}


next.onclick = async()=>{
    page = page+1
    pageNumber.textContent = page
    localStorage.setItem('page', JSON.stringify(page))

    let api = chosenAPI.substring(0, chosenAPI.length-1)
    api = api+page

    renderApi(api)
}