// export const baseUrl = 'http://localhost:3030';   // адрес локального API сервера
export const baseUrl = 'https://api.nekto.lukas.nomoredomains.work';
export const cardImageUrl = 'https://api.nomoreparties.co';

export const userUrl = 'users/me';
export const cardUrl = 'cards';
export const avatarUrl = userUrl + '/avatar';
export const likesUrl = 'likes';  // адрес карточки без idCard

export const initialCards = [
    {
        country: 'страна',
        director: 'режиссер',
        duration: '1ч45',
        year: '1999',
        description: 'бла-бла-бла отличный фильм',
        image: 'https://cdn.fishki.net/upload/post/201501/29/1406478/3ca9ba9dfb08700b2252e9bd4530d063.jpg',
        trailer: 'https://cdn.fishki.net/upload/post/201501/29/1406478/3ca9ba9dfb08700b2252e9bd4530d063.jpg',
        thumbnail: 'https://cdn.fishki.net/upload/post/201501/29/1406478/3ca9ba9dfb08700b2252e9bd4530d063.jpg',
        movieId: '11111111',
        nameRU: 'Название 1',
        nameEN: 'title 1'
    },
    {
        country: 'страна',
        director: 'режиссер',
        duration: '1ч45',
        year: '1999',
        description: 'бла-бла-бла отличный фильм',
        image: 'https://cdn.fishki.net/upload/post/201501/29/1406478/3ca9ba9dfb08700b2252e9bd4530d063.jpg',
        trailer: 'https://cdn.fishki.net/upload/post/201501/29/1406478/3ca9ba9dfb08700b2252e9bd4530d063.jpg',
        thumbnail: 'https://cdn.fishki.net/upload/post/201501/29/1406478/3ca9ba9dfb08700b2252e9bd4530d063.jpg',
        movieId: '2222222',
        nameRU: 'Название 2 Название 2 Название 2 Название 2 Название 2',
        nameEN: 'title 2'
    },
    {
        country: 'страна',
        director: 'режиссер',
        duration: '1ч45',
        year: '1999',
        description: 'бла-бла-бла отличный фильм',
        image: 'https://cdn.fishki.net/upload/post/201501/29/1406478/3ca9ba9dfb08700b2252e9bd4530d063.jpg',
        trailer: 'https://cdn.fishki.net/upload/post/201501/29/1406478/3ca9ba9dfb08700b2252e9bd4530d063.jpg',
        thumbnail: 'https://cdn.fishki.net/upload/post/201501/29/1406478/3ca9ba9dfb08700b2252e9bd4530d063.jpg',
        movieId: '33333333',
        nameRU: 'Название 3',
        nameEN: 'title 3'
    }
];