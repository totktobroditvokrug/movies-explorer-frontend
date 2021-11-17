import { userUrl, cardUrl,  likesUrl, baseUrl } from '../utils/constants';

class Api {
    constructor(config) {
      this._url = config.baseUrl;
      this._headers = config.headers;
    }

    _checkResponse(res) {  // обработчик ошибок
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(res.status);
    }


    getInitialCards() {  // получить массив карточек с сервера
      this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
  //    // // console.log(textError);
      return fetch(`${this._url}/${cardUrl}`, {
        method: "GET",
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    setNewCard(data) { // закинуть новую карточку на сервер
      this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
      // // console.log(`создание карточки- адрес- ${this._url}/${cardUrl}`);
      // console.dir(JSON.stringify(data));
      return fetch(`${this._url}/${cardUrl}`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(
            data  // объект {name: '', link: ''}
            )
      })
      .then(this._checkResponse);
    }

    deleteCard(cardId) {   // удаление карточки
      this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
      return fetch(`${this._url}/${cardUrl}/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    getUserInfo() {  // вернет юзера с сервера     
      this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
      // // console.log('запрос на сервер с токеном', this._headers);
        return fetch(`${this._url}/${userUrl}`, {
            method: "GET",
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    setUserInfo(data) {  // закинет юзера на сервер
      // console.log('API установки нового профиля');
      this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
        return fetch(`${this._url}/${userUrl}`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(
              data
            )
        })
        .then(this._checkResponse);
    }


    //------------- работа с лайками
    setLikeToServer(cardId) {   
      this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
      return fetch(`${this._url}/${cardUrl}/${cardId}/${likesUrl}`, {
        method: "PUT",
        headers: this._headers
      })
    }

    removeLikeFromServer(cardId) {   
      this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
      return fetch(`${this._url}/${cardUrl}/${cardId}/${likesUrl}`, {
        method: "DELETE",
        headers: this._headers
      })
    }

    changeLikeCardStatus(cardId, isLiked) {  
      this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`; 
      return fetch(`${this._url}/${cardUrl}/${cardId}/${likesUrl}`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    updateCardView(cardId) {
      this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
      return fetch(`${this._url}/${likesUrl}/${cardId}`, {
        method: "PATCH",
        headers: this._headers
      })
      .then(this._checkResponse);
    }
}

export const api = new Api({
  baseUrl: baseUrl,
  headers: {
    // authorization: '52d9d703-f9d4-41bc-9951-d16f2045b1bc',
    // 'Content-Type': 'application/json'
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  }
});
