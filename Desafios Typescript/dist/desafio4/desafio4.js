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
var username;
var password;
var sessionId;
var listId = '8207594';
var loginButton = document.getElementById('login-button');
var searchButton = document.getElementById('search-button');
window.onload = function () { return __awaiter(void 0, void 0, void 0, function () {
    var searchImage, images;
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
                if (!(localStorage.getItem('auth') === 'true'))
                    return [2 /*return*/];
                sessionCreated();
                return [2 /*return*/];
        }
    });
}); };
function loginUser(e) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    loginError(true);
                    loginButton.disabled = true;
                    return [4 /*yield*/, logar()];
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
searchButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    var lista, query, listaDeFilmes, ul, _i, _a, item, li;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                lista = document.getElementById("resultList");
                if (lista) {
                    lista.innerHTML = "";
                }
                query = document.getElementById('inputSearch').value;
                return [4 /*yield*/, procurarFilme(query)];
            case 1:
                listaDeFilmes = _b.sent();
                ul = document.createElement('ul');
                ul.id = "search-result";
                for (_i = 0, _a = listaDeFilmes.results; _i < _a.length; _i++) {
                    item = _a[_i];
                    li = document.createElement('li');
                    li.appendChild(document.createTextNode(item.original_title));
                    ul.appendChild(li);
                }
                console.log(listaDeFilmes);
                lista.appendChild(ul);
                return [2 /*return*/];
        }
    });
}); });
function validateLoginButton() {
    username = document.getElementById('login').value;
    password = document.getElementById('senha').value;
    if (password && username) {
        loginButton.disabled = false;
    }
    else {
        loginButton.disabled = true;
    }
}
function loginError(r) {
    var loginError = document.getElementById('login-error');
    if (r) {
        loginError.style.display = 'none';
        return;
    }
    loginError.style.display = 'block';
}
function sessionCreated() {
    document.getElementsByClassName('login-container')[0].style.display = 'none';
    document.getElementsByClassName('header-btn-logged')[0].style.display = 'flex';
    document.getElementsByClassName('mainContainer')[0].style.display = 'block';
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
                            console.log('b');
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
                        url: "https://api.themoviedb.org/3/trending/movie/day?api_key=".concat(apiKey),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
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
                    console.log(query);
                    return [4 /*yield*/, HttpClient.get({
                            url: "https://api.themoviedb.org/3/search/movie?api_key=".concat(apiKey, "&query=").concat(query),
                            method: "GET"
                        })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function adicionarFilme(filmeId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/movie/".concat(filmeId, "?api_key=").concat(apiKey, "&language=en-US"),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
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
function logar() {
    return __awaiter(this, void 0, void 0, function () {
        var login, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
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
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    loginError(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, login];
            }
        });
    });
}
function logar2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/authentication/session/new?api_key=".concat(apiKey),
                        method: "POST",
                        body: {
                            request_token: "".concat(requestToken)
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function deslogar() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=".concat(apiKey),
                        method: "POST",
                        body: {
                            session_id: "".concat(sessionId)
                        }
                    })];
                case 1:
                    _a.sent();
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
                    localStorage.setItem('auth', 'true');
                    return [2 /*return*/];
            }
        });
    });
}
function criarLista(nomeDaLista, descricao) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/list?api_key=".concat(apiKey, "&session_id=").concat(sessionId),
                        method: "POST",
                        body: {
                            name: nomeDaLista,
                            description: descricao,
                            language: "pt-br"
                        }
                    })];
                case 1:
                    result = _a.sent();
                    console.log(sessionId);
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function adicionarFilmeNaLista(filmeId, listaId) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/list/".concat(listaId, "/add_item?api_key=").concat(apiKey, "&session_id=").concat(sessionId),
                        method: "POST",
                        body: {
                            media_id: filmeId
                        }
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function pegarLista() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, HttpClient.get({
                        url: "https://api.themoviedb.org/3/list/".concat(listId, "?api_key=").concat(apiKey),
                        method: "GET"
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=desafio4.js.map