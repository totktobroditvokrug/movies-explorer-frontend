import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';


function NotFound() {
    const history = useHistory();
    return (
        <div className="body not-found">
            <h1 className="not-found__title">404</h1>
            <h2 className="not-found__text">Страница не найдена</h2>
            <p className="not-found__back" onClick={history.goBack}>Назад</p>
        </div>        
    );
}    

export default NotFound;