export const config = {
  url: 'https://api.mesto.project.nomoredomains.work/',
  headers: ()=> {
    const jwt = localStorage.getItem('jwt');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    }
  }
};

export const tooltip = {
  message: 'Вы успешно зарегистрировались!',
  messageErr: 'Что-то пошло не так!Попробуйте ещё раз',
  messageLoginErr: `Введены неправильные данные`,
};

//'https://api.mesto.project.nomoredomains.work/'
//'http://localhost:3000/'
