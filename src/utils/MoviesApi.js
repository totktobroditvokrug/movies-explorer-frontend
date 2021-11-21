const baseUrl = "https://api.nomoreparties.co/beatfilm-movies";

class MoviesApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    // обработчик ошибок
    // console.log('server:', res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getInitialCards() {
    // получить массив карточек с сервера
//    this._headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
    // console.log('запрос апи с фильмами');
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: baseUrl,
  headers: {
    'Accept': "application/json",
    'Content-Type': "application/json",
  },
});

