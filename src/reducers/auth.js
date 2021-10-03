const type = {
  LOGIN: 'auth/Login',
  LOGOUT : 'auth/Logout'
};

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('token')
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case type.LOGIN:
      if(action.payload === null){
        return initialState
      }
      localStorage.setItem('token', action.payload.token)
      return {
        token:action.payload.token,
        isAuth: true,
      }
    case type.LOGOUT:
      localStorage.removeItem('token')
      return{
        isAuth:false,
      }
    default:
      return newState;
  }
};

export const LOGIN = (authData) => ({type: type.LOGIN, payload: authData});
export const LOGOUT = () => ({type: type.LOGOUT, payload: ''});
