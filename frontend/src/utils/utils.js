export const config = {
  url: 'http://api.mesto.project.nomoredomains.work/',
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
};
