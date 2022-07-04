var apiKey = 'c09063c7f95ba681dd0a336a23a554a1';
let requestToken: string;
let sessionId: string;
let listId = '8207594';

window.onload = async () => {
    const searchImage = document.getElementsByClassName('search-image')[0] as HTMLDivElement;
    const images = [
        './imgs/background1.png',
        './imgs/background2.png',
        './imgs/background3.png'
    ]
    searchImage.style.backgroundImage = (`linear-gradient(90deg, rgba(85,115,64,0.8) 0%, rgba(207,217,132,0) 100%),url('`+images[Math.floor(Math.random() * images.length)]+`')`);

    if (!localStorage.getItem('sessionToken')) await criarRequestToken();
    if (!localStorage.getItem('auth'))return;
    const auth:any = localStorage.getItem('auth')
    sessionId = auth
    sessionCreated();
}

async function loginUser(e:Event) {
    e.preventDefault();
    (document.getElementById('login-error') as HTMLDivElement).style.display = 'none';
    (document.getElementById('login-button') as HTMLButtonElement).disabled = true;

    const username = (document.getElementById('login') as HTMLInputElement).value;
    const password = (document.getElementById('senha') as HTMLInputElement).value;

    await logar(username,password);
    await criarSessao();

    sessionCreated();
    
}

function resetInitial(){
    (document.getElementById("defaultList") as HTMLDivElement).style.display = 'block';
    (document.getElementById("resultList") as HTMLDivElement).innerHTML = "";
    (document.getElementById("inputSearch") as HTMLInputElement).value = ""
}

async function sessionCreated(){
    (document.getElementsByClassName('login-container')[0] as HTMLDivElement).style.display = 'none';
    (document.getElementsByClassName('header-btn-logged')[0] as HTMLDivElement).style.display = 'flex';
    (document.getElementsByClassName('cellphone')[0] as HTMLDivElement).style.display = 'block';
    (document.getElementsByClassName('mainContainer')[0] as HTMLDivElement).style.display = 'block';
    
    let trendingList = document.getElementById("trending") as HTMLDivElement;
    let topRatedList = document.getElementById("topRated") as HTMLDivElement;

    const trending = await trendingDay()
    const topRated = await topRatedMovie()

    let ul1 = document.createElement('ul');
    let ul2 = document.createElement('ul');

    for(const item of trending){
        let li = document.createElement('li');
        li.onclick = ()=>{pushModal(item.id)}
        li.innerHTML = `
            <img style='background-image: linear-gradient(0deg, rgba(60, 36, 64,0.8) 0%, rgba(207,217,132,0) 100%),url("https://image.tmdb.org/t/p/w200/${item.poster_path}");'/>
            <p>${item.title}</p>
        `;
        ul1.appendChild(li)
    }

    for(const item of topRated){
        let li = document.createElement('li');
        li.onclick = ()=>{pushModal(item.id)}
        li.innerHTML = `
            <img style='background-image: linear-gradient(0deg, rgba(60, 36, 64,0.8) 0%, rgba(207,217,132,0) 100%),url("https://image.tmdb.org/t/p/w200/${item.poster_path}");'/>
            <p>${item.title}</p>
        `;
        ul2.appendChild(li)
    }

    trendingList.appendChild(ul1)
    topRatedList.appendChild(ul2)
}

async function pushModal(id:any){
    const item = await getMovieDetails(id)
    let provider = await getMovieProvidres(id)
    if(provider)provider = provider.flatrate

    let modal = document.getElementById("modal") as HTMLDivElement;
    modal.style.transform = 'translateY(-105%)'
    modal.style.opacity = '1'

    const data = item.release_date.split('-')
    let genero:any;
    item.genres.map((genre:any)=>{
        if(!genero){
            genero = genre.name;
            return;
        }
        genero = genero +', ' + genre.name
    })

    const modalHeader = document.getElementsByClassName("modal-header")[0] as HTMLDivElement;
    const modalStream = document.getElementsByClassName("modal-stream")[0] as HTMLDivElement;
    const modalBody = document.getElementsByClassName("modal-body")[0] as HTMLDivElement;
    const modalFooter = document.getElementsByClassName("modal-footer")[0] as HTMLDivElement;

    modalHeader.style.backgroundImage = `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.backdrop_path}")`
    modalHeader.innerHTML = `
        <div>
            <img src="https://image.tmdb.org/t/p/w200/${item.poster_path}"/>
            <div class="modal-desc1">
                <h3>${item.title} <span>(${data[0]})</span></h3>
                <div>
                    <span>• ${data[2]}/${data[1]}/${data[0]}</span>
                    <span>• ${genero}</span>
                </div>
                <h4>${item.tagline}</h4>
            </div>
        </div>
    `;
    modalStream.innerHTML = ''
    if(provider){
        modalStream.innerHTML = '<p>Disponivel em:</p>'
        let ul = document.createElement('ul');
        for(const item of provider){
            let li = document.createElement('li');
            li.innerHTML = `
                <img src="https://www.themoviedb.org/t/p/original${item.logo_path}" alt="${item.provider_name}"/>
            `;
            ul.appendChild(li)
        }
        modalStream.appendChild(ul);
    }
    
    modalBody.innerHTML = `
        <h2>Sinopse</h2>
        <p>${item.overview}</p>
    `;
    modalFooter.innerHTML = `
    
    `;

    
}

function closeModal(){
    let modal = document.getElementById("modal") as HTMLDivElement;
    modal.style.transform = ''
    modal.style.opacity = ''
}

async function searchBtn(e:Event) {
    e.preventDefault();
    (document.getElementById("defaultList") as HTMLDivElement).style.display = 'none';
    
    let lista = document.getElementById("resultList") as HTMLDivElement;
    if (lista) {
        lista.innerHTML = "";
    }
    let query = (document.getElementById('inputSearch') as HTMLInputElement).value;
    let listaDeFilmes: any = await procurarFilme(query);
    console.log(listaDeFilmes)

    
    if(listaDeFilmes == ""){
        lista.innerHTML = `
            Não Encontrado
        `;
        setTimeout(() => {
            lista.innerHTML = '';
            (document.getElementById("defaultList") as HTMLDivElement).style.display = 'block';
        }, 2000);
        return;
    }

    let ul = document.createElement('ul');
    ul.id = "search-result"
    for (const item of listaDeFilmes) {

        let imgUrl = `https://image.tmdb.org/t/p/w200${item.poster_path}`
        if(!item.poster_path){
            imgUrl = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
        }

        let li = document.createElement('li');
        li.onclick = ()=>{pushModal(item.id)}
        li.innerHTML = `
            <img style='background-image: linear-gradient(0deg, rgba(60, 36, 64,0.8) 0%, rgba(207,217,132,0) 100%),url(${imgUrl});'/>
            <p>${item.title}</p>
        `;
        ul.appendChild(li)
    }
    lista.appendChild(ul);
    
}

function validateLoginButton() {
    const username = (document.getElementById('login') as HTMLInputElement).value;
    const password = (document.getElementById('senha') as HTMLInputElement).value;
    if (password && username) {
        (document.getElementById('login-button') as HTMLButtonElement).disabled = false;
    } else {
        (document.getElementById('login-button') as HTMLButtonElement).disabled = true;
    }
}



class HttpClient {
    static async get(obj: { url: string, method: string, body?:any}) {
        return new Promise((resolve, reject) => {
            let { url, method, body } = obj;
            let request = new XMLHttpRequest();
            request.open(method, url, true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                      
                    })
                    
                }
            }
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText
                })
            }
            if (body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                body = JSON.stringify(body);
                
            }
            request.send(body);
        })
        
    }
    
}


/** LOAD FILMES PAG INICIAL */
async function trendingDay() {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`,
        method: "GET"
    })
    return result.results
}

async function topRatedMovie() {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR`,
        method: "GET"
    })
    return result.results
}

/** PEGAR DETALHES DO FILME */

async function getMovieDetails(movie_id:any) {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=pt-BR`,
        method: "GET"
    })
    return result
}

async function getMovieProvidres(movie_id:any) {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${apiKey}`,
        method: "GET"
    })
    return result.results.BR
}








async function procurarFilme(query:string) {
    query = encodeURI(query)
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`,
        method: "GET"
    })
    return result.results
}

/*
async function adicionarFilme(filmeId:string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: "GET"
    })
}



async function criarLista(nomeDaLista:string, descricao:string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            name: nomeDaLista,
            description: descricao,
            language: "pt-br"
        }
    })
}

async function adicionarFilmeNaLista(filmeId:string, listaId:string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            media_id: filmeId
        }
    })
}

async function pegarLista() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: "GET"
    })
}
*/









/** LOGAR USUARIO */
async function criarRequestToken() {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    })
    requestToken = result.request_token
    localStorage.setItem('sessionToken', requestToken)
}

async function logar(username:String,password:String) {
  let login:any
  try {
    login = await HttpClient.get({
      url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
      method: "POST",
      body: {
          username: `${username}`,
          password: `${password}`,
          request_token: `${requestToken}`
        }
    })
  } catch (error) {
    (document.getElementById('login-error') as HTMLDivElement).style.display = 'block'
    localStorage.clear()
    await criarRequestToken()
  }
    return login
}


async function deslogar() {
    try{
        await HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`,
            method: "POST",
            body: {
                session_id: `${sessionId}`
              }
          })
    }catch(error){
        console.log(error)
    }
  
  localStorage.clear();
  location.reload();
}

async function criarSessao() {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    })
    sessionId = result.session_id;
    localStorage.setItem('auth', sessionId);
}
