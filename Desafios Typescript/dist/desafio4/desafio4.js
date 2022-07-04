"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var apiKey = 'c09063c7f95ba681dd0a336a23a554a1';
var requestToken;
var sessionId;
var listId = '8207594';
window.onload = function () { return __awaiter(void 0, void 0, void 0, function () {
    var searchImage, images, auth;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchImage = document.getElementsByClassName('search-image')[0];
                images = [
                    './imgs/background1.png',
                    './imgs/background2.png',
                    './imgs/background3.png'
                ];
                searchImage.style.backgroundImage = ("linear-gradient(90deg, rgba(85,115,64,0.8) 0%, rgba(207,217,132,0) 100%),url('" + images[Math.floor(Math.random() * images.length)] + "')");
                if (!!localStorage.getItem('sessionToken')) return [3 /*break*/, 2];
                return [4 /*yield*/, criarRequestToken()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!localStorage.getItem('auth'))
                    return [2 /*return*/];
                auth = localStorage.getItem('auth');
                sessionId = auth;
                sessionCreated();
                return [2 /*return*/];
        }
    });
}); };
function loginUser(e) {
    return __awaiter(this, void 0, void 0, function () {
        var username, password;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    document.getElementById('login-error').style.display = 'none';
                    document.getElementById('login-button').disabled = true;
                    username = document.getElementById('login').value;
                    password = document.getElementById('senha').value;
                    return [4 /*yield*/, logar(username, password)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, criarSessao()];
                case 2:
                    _a.sent();
                    sessionCreated();
                    return [2 /*return*/];
            }
        });
    });
}
function resetInitial() {
    document.getElementById("defaultList").style.display = 'block';
    document.getElementById("resultList").innerHTML = "";
    document.getElementById("inputSearch").value = "";
}
function sessionCreated() {
    return __awaiter(this, void 0, void 0, function () {
        var trendingList, topRatedList, trending, topRated, ul1, ul2, _loop_1, _i, trending_1, item, _loop_2, _a, topRated_1, item;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    document.getElementsByClassName('login-container')[0].style.display = 'none';
                    document.getElementsByClassName('header-btn-logged')[0].style.display = 'flex';
                    document.getElementsByClassName('cellphone')[0].style.display = 'block';
                    document.getElementsByClassName('mainContainer')[0].style.display = 'block';
                    trendingList = document.getElementById("trending");
                    topRatedList = document.getElementById("topRated");
                    return [4 /*yield*/, trendingDay()];
                case 1:
                    trending = _b.sent();
                    return [4 /*yield*/, topRatedMovie()];
                case 2:
                    topRated = _b.sent();
                    ul1 = document.createElement('ul');
                    ul2 = document.createElement('ul');
                    _loop_1 = function (item) {
                        var li = document.createElement('li');
                        li.onclick = function () { pushModal(item.id); };
                        li.innerHTML = "\n            <img style='background-image: linear-gradient(0deg, rgba(60, 36, 64,0.8) 0%, rgba(207,217,132,0) 100%),url(\"https://image.tmdb.org/t/p/w200/".concat(item.poster_path, "\");'/>\n            <p>").concat(item.title, "</p>\n        ");
                        ul1.appendChild(li);
                    };
                    for (_i = 0, trending_1 = trending; _i < trending_1.length; _i++) {
                        item = trending_1[_i];
                        _loop_1(item);
                    }
                    _loop_2 = function (item) {
                        var li = document.createElement('li');
                        li.onclick = function () { pushModal(item.id); };
                        li.innerHTML = "\n            <img style='background-image: linear-gradient(0deg, rgba(60, 36, 64,0.8) 0%, rgba(207,217,132,0) 100%),url(\"https://image.tmdb.org/t/p/w200/".concat(item.poster_path, "\");'/>\n            <p>").concat(item.title, "</p>\n        ");
                        ul2.appendChild(li);
                    };
                    for (_a = 0, topRated_1 = topRated; _a < topRated_1.length; _a++) {
                        item = topRated_1[_a];
                        _loop_2(item);
                    }
                    trendingList.appendChild(ul1);
                    topRatedList.appendChild(ul2);
                    return [2 /*return*/];
            }
        });
    });
}
function pushModal(id) {
    return __awaiter(this, void 0, void 0, function () {
        var item, provider, modal, data, genero, modalHeader, modalStream, modalBody, modalFooter, ul, _i, provider_1, item_1, li;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMovieDetails(id)];
                case 1:
                    item = _a.sent();
                    return [4 /*yield*/, getMovieProvidres(id)];
                case 2:
                    provider = _a.sent();
                    if (provider)
                        provider = provider.flatrate;
                    modal = document.getElementById("modal");
                    modal.style.transform = 'translateY(-105%)';
                    modal.style.opacity = '1';
                    data = item.release_date.split('-');
                    item.genres.map(function (genre) {
                        if (!genero) {
                            genero = genre.name;
                            return;
                        }
                        genero = genero + ', ' + genre.name;
                    });
                    modalHeader = document.getElementsByClassName("modal-header")[0];
                    modalStream = document.getElementsByClassName("modal-stream")[0];
                    modalBody = document.getElementsByClassName("modal-body")[0];
                    modalFooter = document.getElementsByClassName("modal-footer")[0];
                    modalHeader.style.backgroundImage = "url(\"https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces".concat(item.backdrop_path, "\")");
                    modalHeader.innerHTML = "\n        <div>\n            <img src=\"https://image.tmdb.org/t/p/w200/".concat(item.poster_path, "\"/>\n            <div class=\"modal-desc1\">\n                <h3>").concat(item.title, " <span>(").concat(data[0], ")</span></h3>\n                <div>\n                    <span>\u2022 ").concat(data[2], "/").concat(data[1], "/").concat(data[0], "</span>\n                    <span>\u2022 ").concat(genero, "</span>\n                </div>\n                <h4>").concat(item.tagline, "</h4>\n            </div>\n        </div>\n    ");
                    modalStream.innerHTML = '';
                    if (provider) {
                        modalStream.innerHTML = '<p>Disponivel em:</p>';
                        ul = document.createElement('ul');
                        for (_i = 0, provider_1 = provider; _i < provider_1.length; _i++) {
                            item_1 = provider_1[_i];
                            li = document.createElement('li');
                            li.innerHTML = "\n                <img src=\"https://www.themoviedb.org/t/p/original".concat(item_1.logo_path, "\" alt=\"").concat(item_1.provider_name, "\"/>\n            ");
                            ul.appendChild(li);
                        }
                        modalStream.appendChild(ul);
                    }
                    modalBody.innerHTML = "\n        <h2>Sinopse</h2>\n        <p>".concat(item.overview, "</p>\n    ");
                    modalFooter.innerHTML = "\n    \n    ";
                    return [2 /*return*/];
            }
        });
    });
}
function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.transform = '';
    modal.style.opacity = '';
}
function searchBtn(e) {
    return __awaiter(this, void 0, void 0, function () {
        var lista, query, listaDeFilmes, ul, _loop_3, _i, listaDeFilmes_1, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    document.getElementById("defaultList").style.display = 'none';
                    lista = document.getElementById("resultList");
                    if (lista) {
                        lista.innerHTML = "";
                    }
                    query = document.getElementById('inputSearch').value;
                    return [4 /*yield*/, procurarFilme(query)];
                case 1:
                    listaDeFilmes = _a.sent();
                    console.log(listaDeFilmes);
                    if (listaDeFilmes == "") {
                        lista.innerHTML = "\n            N\u00E3o Encontrado\n        ";
                        setTimeout(function () {
                            lista.innerHTML = '';
                            document.getElementById("defaultList").style.display = 'block';
                        }, 2000);
                        return [2 /*return*/];
                    }
                    ul = document.createElement('ul');
                    ul.id = "search-result";
                    _loop_3 = function (item) {
                        var imgUrl = "https://image.tmdb.org/t/p/w200".concat(item.poster_path);
                        if (!item.poster_path) {
                            imgUrl = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
                        }
                        var li = document.createElement('li');
                        li.onclick = function () { pushModal(item.id); };
                        li.innerHTML = "\n            <img style='background-image: linear-gradient(0deg, rgba(60, 36, 64,0.8) 0%, rgba(207,217,132,0) 100%),url(".concat(imgUrl, ");'/>\n            <p>").concat(item.title, "</p>\n        ");
                        ul.appendChild(li);
                    };
                    for (_i = 0, listaDeFilmes_1 = listaDeFilmes; _i < listaDeFilmes_1.length; _i++) {
                        item = listaDeFilmes_1[_i];
                        _loop_3(item);
                    }
                    lista.appendChild(ul);
                    return [2 /*return*/];
            }
        });
    });
}
function validateLoginButton() {
    var username = document.getElementById('login').value;
    var password = document.getElementById('senha').value;
    if (password && username) {
        document.getElementById('login-button').disabled = false;
    }
    else {
        document.getElementById('login-button').disabled = true;
    }
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.get = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var url = obj.url, method = obj.method, body = obj.body;
                        var request = new XMLHttpRequest();
                        request.open(method, url, true);
                        request.onload = function () {
                            if (request.status >= 200 && request.status < 300) {
                                resolve(JSON.parse(request.responseText));
                            }
                            else {
                                reject({
                                    status: request.status,
                                    statusText: request.statusText
                                });
                            }
                        };
                        request.onerror = function () {
                            reject({
                                status: request.status,
                                statusText: request.statusText
                            });
                        };
                        if (body) {
                            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                            body = JSON.stringify(body);
                        }
                        request.send(body);
                    })];
            });
        });
    };
    return HttpClient;
}());
/** LOAD FILMES PAG INICIAL */
function trendingDay() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/movie/popular?api_key=".concat(apiKey, "&language=pt-BR"),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.results];
            }
        });
    });
}
function topRatedMovie() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/movie/top_rated?api_key=".concat(apiKey, "&language=pt-BR"),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.results];
            }
        });
    });
}
/** PEGAR DETALHES DO FILME */
function getMovieDetails(movie_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/movie/".concat(movie_id, "?api_key=").concat(apiKey, "&language=pt-BR"),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function getMovieProvidres(movie_id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/movie/".concat(movie_id, "/watch/providers?api_key=").concat(apiKey),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.results.BR];
            }
        });
    });
}
function procurarFilme(query) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = encodeURI(query);
                    return [4 /*yield*/, HttpClient.get({
                            url: "https://api.themoviedb.org/3/search/movie?api_key=".concat(apiKey, "&query=").concat(query, "&language=pt-BR"),
                            method: "GET"
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.results];
            }
        });
    });
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
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/authentication/token/new?api_key=".concat(apiKey),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    requestToken = result.request_token;
                    localStorage.setItem('sessionToken', requestToken);
                    return [2 /*return*/];
            }
        });
    });
}
function logar(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var login, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 4]);
                    return [4 /*yield*/, HttpClient.get({
                            url: "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=".concat(apiKey),
                            method: "POST",
                            body: {
                                username: "".concat(username),
                                password: "".concat(password),
                                request_token: "".concat(requestToken)
                            }
                        })];
                case 1:
                    login = _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    document.getElementById('login-error').style.display = 'block';
                    localStorage.clear();
                    return [4 /*yield*/, criarRequestToken()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, login];
            }
        });
    });
}
function deslogar() {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, HttpClient.get({
                            url: "https://api.themoviedb.org/3/authentication/session?api_key=".concat(apiKey),
                            method: "POST",
                            body: {
                                session_id: "".concat(sessionId)
                            }
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3:
                    localStorage.clear();
                    location.reload();
                    return [2 /*return*/];
            }
        });
    });
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/authentication/session/new?api_key=".concat(apiKey, "&request_token=").concat(requestToken),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    sessionId = result.session_id;
                    localStorage.setItem('auth', sessionId);
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=desafio4.js.map