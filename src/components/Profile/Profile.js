import React from 'react';
import './Profile.css';

const userName = 'Сергей'

function Profile({email}) {
    return (
        <div className="body profile">
            <h1 className="profile__title">Привет, {userName}!</h1>
            <div className="profile__form profile__form_underline">
                <p className="profile__field">Имя</p>
                <input type="text" className="profile__input" value={userName}/>
            </div>
            <div className="profile__form">
                <p className="profile__field">E-mail</p>
                <input type="text" className="profile__input" value={email}/>
            </div>
            <p className="profile__edit">Редактировать</p>
            <p className="profile__exit">Выйти из аккаунта</p>
        </div>        
    );
}    

export default Profile;