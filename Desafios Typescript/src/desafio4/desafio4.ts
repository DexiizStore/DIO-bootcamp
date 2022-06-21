var apiKey = 'c09063c7f95ba681dd0a336a23a554a1';
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId = '8207594';

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container') as HTMLDivElement;

window.onload = async () => {
  if (!localStorage.getItem('sessionToken')) await criarRequestToken();
  if (!(localStorage.getItem('auth') === 'true'))return;
  sessionCreated();
}

async function loginUser(e:Event) {
    e.preventDefault();
    loginError(true);
    loginButton.disabled = true;
    await logar();
    await criarSessao();
    sessionCreated();
}

searchButton.addEventListener('click', async () => {
    /*let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let query = (document.getElementById('search') as HTMLInputElement).value;
    let listaDeFilmes: any = await procurarFilme(query);
    let ul = document.createElement('ul');
    ul.id = "lista"
    for (const item of listaDeFilmes.results) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item.original_title))
        ul.appendChild(li)
    }
    console.log(listaDeFilmes);
    searchContainer.appendChild(ul);*/
})

function validateLoginButton() {
    username = (document.getElementById('login') as HTMLInputElement).value;
    password = (document.getElementById('senha') as HTMLInputElement).value;
    if (password && username) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

function loginError(r:boolean){
    const loginError = document.getElementById('login-error') as HTMLDivElement;
    if (r) {
      loginError.style.display = 'none';
      return;
    }
    loginError.style.display = 'block';
}

function sessionCreated(){
  (document.getElementsByClassName('login-container')[0] as HTMLDivElement).style.display = 'none';
  (document.getElementsByClassName('mainContainer')[0] as HTMLDivElement).style.display = 'block';

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
                console.log('b')
            }
            if (body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                body = JSON.stringify(body);
                
            }
            request.send(body);
        })
        
    }
    
}

async function procurarFilme(query:string) {
    query = encodeURI(query)
    console.log(query)
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        method: "GET"
    })
    return result
}

async function adicionarFilme(filmeId:string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: "GET"
    })
    console.log(result);
}

async function criarRequestToken() {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    })
    requestToken = result.request_token
    localStorage.setItem('sessionToken', requestToken)
}

async function logar() {
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
    loginError(false);
  }
    return login
}

async function logar2() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
    method: "POST",
    body: {
      request_token: `${requestToken}`
      }
  })
}

async function deslogar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
        session_id: `${sessionId}`
      }
  })
}






async function criarSessao() {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    })
    sessionId = result.session_id;
    localStorage.setItem('auth', 'true');
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
    console.log(sessionId);
    console.log(result);
}

async function adicionarFilmeNaLista(filmeId:string, listaId:string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            media_id: filmeId
        }
    })
    console.log(result);
}

async function pegarLista() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: "GET"
    })
    console.log(result);
}