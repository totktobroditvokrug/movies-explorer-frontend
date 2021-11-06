const STATUS_OK = 200; //
const ERROR_CODE = 400; //  переданы некорректные данные
const ERROR_ID = 404; //  карточка или пользователь не найден
const ERROR_DEF = 500; //  ошибка по умолчанию
const ERROR_LOGIN = 401; //  неверные пароль/емэйл
const ERROR_DUPLICATE = 409; //  пользователь уже существует
const ERROR_AUTH = 401;
const ERROR_ACCES = 403;

// const MONGO_DUPLICATE_EMAIL = 11000; //  такой емэйл уже существует

export function chekErrorType(errStatus){
  let errMessage = 'Ошибка не идентифицируется';
  switch(errStatus){
    case STATUS_OK: errMessage = 'Успешный ответ'; break;
    case ERROR_CODE: errMessage = 'Переданы некорректные данные'; break;
    case ERROR_ID: errMessage = 'Карточка или пользователь не найден'; break;
    case ERROR_LOGIN: errMessage = 'Ошибочный пароль или емэйл'; break;
    case ERROR_DUPLICATE: errMessage = 'Такой пользователь уже существует'; break;
    case ERROR_AUTH: errMessage = 'Проблемы с токеном'; break;
    case ERROR_ACCES: errMessage = 'Доступ к ресурсу запрещен'; break;
    case ERROR_DEF: errMessage = 'Сервер упал'; break; 
  }
  return errMessage;
}

// export const errorTypes = {
//   STATUS_OK,
//   ERROR_CODE,
//   ERROR_DEF,
//   ERROR_LOGIN,
//   ERROR_DUPLICATE,
//   MONGO_DUPLICATE_EMAIL,
//   ERROR_AUTH,
//   ERROR_ID,
//   ERROR_ACCES,
// };
